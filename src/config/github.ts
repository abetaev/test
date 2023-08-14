import { execSync } from 'child_process'

const remote = execSync("git remote get-url origin").toString().trimEnd()
const groups = remote.match(
  /^(?:(git@github.com:)|(https:\/\/github.com\/))(?<user>[^\/]*)\/(?<repo>.*).git$/
)?.groups ?? {}

if (!groups.user) throw `github: unable to determine user`
if (!groups.repo) throw `github: unable to determine repo`

export default {
  user: groups.user,
  repo: groups.repo,
  auth: `token ${import.meta.env["SECRET_GITHUB_TOKEN"]}`
}
