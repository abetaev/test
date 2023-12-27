import { Buffer } from 'buffer'
import { expose } from 'comlink'
import { del, get, keys, set } from 'idb-keyval'
import { ExportedIdentity, exportIdentity, generateIdentity, generateSalt, importIdentity } from '~/utils/crypto'

export type ExportedAccount = {
  username: string
  salt: string
  identity: ExportedIdentity
}

const service = {
  create: async function (username: string, password: string): Promise<void> {
    const salt = generateSalt().toString('base64')
    const exportedAccount: ExportedAccount = {
      username,
      salt,
      identity: await exportIdentity(await generateIdentity(), password, Buffer.from(salt, 'base64'))
    }
    await set(username, exportedAccount)
    console.log(`identity ${username} saved`)
  },
  list: async function () {
    return (await keys()).map(key => key.toString())
  },
  delete: async function (username: string, password: string): Promise<void> {
    try {
      const account: ExportedAccount | undefined = await get(username)
      if (!account) throw new Error(`account ${account} not found`)
      await importIdentity(account.identity, password, Buffer.from(account.salt, 'base64'))
      del(username)
    } catch (cause) {
      throw new Error("unable to delete account", { cause })
    }
  }
}

expose(service)

type Service = typeof service
export type { Service as AccountService }

