import { Buffer } from 'buffer'


// generators

export function generateSalt() {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(32)))
}

const generateEncryptionKeyPair = () => crypto.subtle.generateKey(
  {
    name: "RSA-OAEP",
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256"
  },
  true,
  ["encrypt", "decrypt"]
)

const generateSigningKeyPair = () => crypto.subtle.generateKey(
  {
    name: "RSA-PSS",
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256"
  },
  true,
  ["sign", "verify"]
)

export const generateIdentity = async (): Promise<Identity> => ({
  signature: await generateSigningKeyPair(),
  encryption: await generateEncryptionKeyPair()
})

// import/export

const encoder = new TextEncoder()

async function createPasskey(password: string, salt: Uint8Array) {
  const passkey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  )

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    passkey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  )
}

const PRIVATE_KEY_PREFIX = "-----BEGIN PRIVATE KEY-----\n"
const PRIVATE_KEY_SUFFIX = "\n-----END PRIVATE KEY-----"
const exportPrivateKey = async (key: CryptoKey, password: string, salt: Buffer) =>
  `${PRIVATE_KEY_PREFIX}${Buffer.from(await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: salt // ? should be pepper to implement 2-phase auth? (TODO)
    },
    await createPasskey(password, salt),
    await crypto.subtle.exportKey("pkcs8", key)
  )).toString('base64')}${PRIVATE_KEY_SUFFIX}`

const importPrivateKey = async (input: string, password: string, salt: Buffer, name: "RSA-PSS" | "RSA-OAEP", usage: KeyUsage) => crypto.subtle.importKey(
  "pkcs8",
  await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: salt
    },
    await createPasskey(password, salt),
    readKey(input, PRIVATE_KEY_PREFIX, PRIVATE_KEY_SUFFIX)
  ),
  { name, hash: "SHA-256" },
  false,
  [usage]
)


const PUBLIC_KEY_PREFIX = "-----BEGIN PUBLIC KEY-----\n"
const PUBLIC_KEY_SUFFIX = "\n-----END PUBLIC KEY-----"
const exportPublicKey = async (key: CryptoKey) =>
  `${PUBLIC_KEY_PREFIX}${Buffer.from(await crypto.subtle.exportKey("spki", key)).toString('base64')}${PUBLIC_KEY_SUFFIX}`
const importPublicKey = async (input: string, name: "RSA-PSS" | "RSA-OAEP", usage: KeyUsage) =>
  crypto.subtle.importKey(
    "spki",
    readKey(input, PUBLIC_KEY_PREFIX, PUBLIC_KEY_SUFFIX),
    { name, hash: "SHA-256" },
    false,
    [usage]
  )

function readKey(input: string, prefix: string, suffix: string) {
  if (!(input.startsWith(prefix) || input.endsWith(suffix)))
    throw new Error(`invalid key format: ${input}`)
  return Buffer.from(input.substring(prefix.length, input.length - suffix.length), 'base64')
}

const exportKeyPair = async (keypair: CryptoKeyPair, password: string, salt: Buffer) => ({
  privateKey: await exportPrivateKey(keypair.privateKey, password, salt),
  publicKey: await exportPublicKey(keypair.publicKey)
})

const importSignatureKeyPair = async (input: ExportedKeyPair, password: string, salt: Buffer): Promise<CryptoKeyPair> => ({
  privateKey: await importPrivateKey(input.privateKey, password, salt, "RSA-PSS", "sign"),
  publicKey: await importPublicKey(input.publicKey, "RSA-PSS", "verify")
})

const importEncryptionKeyPair = async (input: ExportedKeyPair, password: string, salt: Buffer): Promise<CryptoKeyPair> => ({
  privateKey: await importPrivateKey(input.privateKey, password, salt, "RSA-OAEP", "decrypt"),
  publicKey: await importPublicKey(input.publicKey, "RSA-OAEP", "encrypt")
})

export type Identity = {
  signature: CryptoKeyPair
  encryption: CryptoKeyPair
}
export type ExportedIdentity = {
  signature: ExportedKeyPair
  encryption: ExportedKeyPair
}
type ExportedKeyPair = {
  privateKey: string
  publicKey: string
}
export const importIdentity = async (input: ExportedIdentity, password: string, salt: Buffer): Promise<Identity> => ({
  signature: await importSignatureKeyPair(input.signature, password, salt),
  encryption: await importEncryptionKeyPair(input.encryption, password, salt)
})

export const exportIdentity = async (input: Identity, password: string, salt: Buffer): Promise<ExportedIdentity> => ({
  signature: await exportKeyPair(input.signature, password, salt),
  encryption: await exportKeyPair(input.signature, password, salt)
})