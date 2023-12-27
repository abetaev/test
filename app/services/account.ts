type Account = { username: string }
type Service = {
  create(username: string, password: string): Promise<void>
  login(username: string, password: string): Promise<void>
  list(): Promise<Account[]>
  delete(username: string, password: string): Promise<void>
}

const service: Service = {
  create: async function (username: string, password: string): Promise<void> {
    console.log(`create: ${username}:${password}`)
  },
  login: async function (username: string, password: string): Promise<void> {
    console.log("login")
  },
  list: async function () {
    console.log("list")
    return []
  },
  delete: async function (username: string, password: string): Promise<void> {
    console.log("delete")
  }
}

export type {Service as AccountService}

