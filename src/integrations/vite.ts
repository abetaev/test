import { mkdirSync, readFileSync, statSync, unlinkSync, writeFileSync ,existsSync} from 'fs';
import { globSync } from 'glob';
import { dirname } from 'path';
import { cwd } from 'process';
import { remark } from "remark";
import frontmatter from 'remark-frontmatter';
import { v4 as uuid } from 'uuid';
import type { PluginOption } from 'vite';
import YAML from 'yaml';

const CONTENT_DIR = 'src/content'
const INPUT_DIR = `articles`
const OUTPUT_DIR = `previews`

const REMARK_INSTANCE = remark().use(frontmatter)

const update = () => {
  for (const filename of globSync("**/*", { nodir: true, cwd: `${CONTENT_DIR}/${INPUT_DIR}` })) {
    try {
      const inputFileStat = statSync(`${CONTENT_DIR}/${INPUT_DIR}/${filename}`)
      const outputFileStat = statSync(`${CONTENT_DIR}/${OUTPUT_DIR}/${filename}`)
      if (inputFileStat.ctimeMs > outputFileStat.ctimeMs)
        updateEntry(filename)
    } catch {
      updateEntry(filename)
    }
  }
  for (const filename of globSync("**/*", { nodir: true, cwd: OUTPUT_DIR })) {
    try {
      statSync(`${CONTENT_DIR}/${INPUT_DIR}/${filename}`)
    } catch {
      removeEntry(filename)
    }
  }
}

function updateEntry(filename: string) {
  const articleFilename = `${CONTENT_DIR}/${INPUT_DIR}/${filename}`
  const content = REMARK_INSTANCE.parse(readFileSync(articleFilename).toString())

  const frontmatterNode = content.children[0]
  if (!frontmatterNode || frontmatterNode.type !== "yaml")
    throw `no front matter in ${filename}`
  const frontmatterData = YAML.parse(frontmatterNode.value)
  if (!frontmatterData.id) {
    console.log(`adding id for ${filename}`)
    frontmatterData.id = uuid()
    frontmatterNode.value = YAML.stringify(frontmatterData, {})
    writeFileSync(articleFilename, REMARK_INSTANCE.stringify(content))
  }

  console.log(`generating preview for ${filename}`)
  const previewFilename = `${CONTENT_DIR}/${OUTPUT_DIR}/${filename}`
  if (!existsSync(dirname(previewFilename))) {
    mkdirSync(dirname(previewFilename))
  }
  let count = 0
  for (let i = 0; i < content.children.length; i++) {
    const child = content.children[i]
    if (!child) continue
    if (child.type === "heading" && child.depth === 1) {
      count++
      if (count > 1) { // cut condition
        content.children.splice(i)
        break;
      }
    }
  }
  writeFileSync(previewFilename, REMARK_INSTANCE.stringify(content))
}

function removeEntry(filename: string) {
  unlinkSync(`${CONTENT_DIR}${OUTPUT_DIR}/${filename}`)
}


const plugin: PluginOption = {
  name: "vite-plugin-project-customization",
  enforce: "pre",
  load(id) {
    if (id.substring(cwd().length) === '/src/content/config.ts')
      update()
  },
}

export default plugin;