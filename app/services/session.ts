import { expose } from 'comlink'
import { get } from 'idb-keyval'
import { v4 as uuid } from 'uuid'
import { Identity, importIdentity } from '~/utils/crypto'
import { ExportedAccount } from './account'
import { Buffer } from 'buffer'

type Session = string

const sessions: Record<string, Identity> = {}

const service = {
  async login(username: string, password: string): Promise<Session> {
    const account: ExportedAccount | undefined = await get(username)
    if (!account) throw new Error(`account ${username} not found`)
    const session = uuid()
    sessions[session] = await importIdentity(account.identity, password, Buffer.from(account.salt, 'base64'))
    return session
  },
  close(session: Session) {
    delete sessions[session]
  }
}

// @ts-expect-error how to tell ts that it's a shared worker?
onconnect = (event: any) => expose(service, event.ports[0])

type Service = typeof service
export type { Service as SessionService }
export default service