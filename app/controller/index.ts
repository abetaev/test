type Article = {
  header: string | {
    title: string
    subtitle: string
  }
  body: string
}

type Controller = {
  articles: Article[]
}