import * as comlink from 'comlink'
import {AccountService}from './account'


const worker = new ComlinkSharedWorker(new URL("./account.ts", import.meta.url), {type: 'module'})

export default {
  account: comlink.wrap<AccountService>(worker.port)
}
