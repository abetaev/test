import * as comlink from 'comlink'
import { AccountService } from './account'
import { SessionService } from './session'
import navigation from './navigation'

const url = (name: String) => new URL(`./${name}.ts`, import.meta.url)
const dedicatedService = <T>(name: string) => comlink.wrap<T>(
  new Worker(url(name), { type: 'module' })
)

const sharedServices: Record<string, SharedWorker> = {}
const sharedService = <T>(name: string) => {
  if (!sharedServices[name])
    sharedServices[name] = new SharedWorker(url(name), { type: 'module' })
  return comlink.wrap<T>(sharedServices[name].port)
}

export default {
  account: dedicatedService<AccountService>("account"),
  session: sharedService<SessionService>("session"),
  navigation
}
