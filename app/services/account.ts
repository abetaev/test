type Account = { username: string }
type Service = {
  create(username: string, password: string): Promise<void>
  login(username: string, password: string): Promise<void>
  list(): Account[]
  delete(username: string, password: string): Promise<void>
}

