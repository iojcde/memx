import fs from 'fs'
import { buildExcerpt } from 'utils/buildExcerpt'
import type { TreeNode } from './types/TreeNode'

const getHex = (content: string, filename: string, dir: string) => {
  // go through each file in directory to see if frontmatter contains hex
  // if it doesn't, create a new hex and assign it to the file

  // check if file contains hex
  const hasHex = content.includes(`hex:`) && content.includes(`---`)
  // if it doesn't, create a new hex and assign it to the file
  if (hasHex) {
    const hex = content.match(/hex: (.+)/)?.[1] as string

    return hex
  } else {
    console.log(`adding hex to ${filename}:`)
    const newHex = Math.floor(Math.random() * 16777215)
      .toString(16)
      .toUpperCase()

    //if it doesn't have frontmatter, add it
    if (!content.includes(`---`)) {
      content = `---\n` + content
    }

    const newContent = content.replace(/---/, `---\nhex: ${newHex}\n---`)

    console.log(`assigned hex ${newHex} to `, filename)

    fs.writeFileSync(`${dir}/${filename}`, newContent)
    return newHex
  }
}

const DateToString = (date: Date) => {
  return [date.getFullYear(), date.getMonth(), date.getDate()].join(`-`)
}

const allBacklinks: Record<string, Record<string, string>> = {}

const compileBacklinks = (content: string, filename: string) => {
  const title = filename.replace(`.md`, ``)

  const hasBacklinks = content.includes(`[[`)
  if (hasBacklinks) {
    const backlinks = content.matchAll(/.*\[\[(.+?)\]\].*/g)
    const array = [...backlinks]

    array.forEach((m) => {
      allBacklinks[m[1]] = {
        ...allBacklinks[title],
        [title]: m[0],
      }
    })
  }
  return content
}

const cachedLastEdited: Record<string, string> = JSON.parse(
  fs.readFileSync(`./assets/last-edited.json`, `utf-8`),
)

const isEdited = (filename: string, hex: string) => {
  const cachedDate = cachedLastEdited[hex]
  if (cachedDate) {
    if (cachedDate != fs.statSync(filename).atime.toDateString()) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

const editedFiles: Record<string, string[]> = {}
const filenames: Record<string, string> = {} // { hex: filename }
const today = new Date()

const finalTree: TreeNode[] = []

const replaceDirNameMap = {
  './data/research': `Research`,
  './data/React & Next.js 겨우 마스터하기': `React & Next.js 겨우 마스터하기`,
}

// loop through files
for (const dir of [`./data/React & Next.js 겨우 마스터하기`, `./data/research`]) {
  const files = fs.readdirSync(dir)

  const tmpTree: TreeNode = {
    title: replaceDirNameMap[dir],
    children: [],
    collapsible: true,
    collapsed: replaceDirNameMap[dir] == `Research` ?? false,
  }

  for (const filename of files) {
    // read in file
    const fileContent = fs.readFileSync(`${dir}/${filename}`, `utf8`)
    compileBacklinks(fileContent, filename)

    const hex = getHex(fileContent, filename, dir)
    filenames[
      filename.replace(/\.md$/, ``).replaceAll(` `, `-`).toLowerCase()
    ] = hex

    tmpTree.children?.push({
      title: filename.replace(`.md`, ``),
      excerpt: buildExcerpt(fileContent),
      urlPath: `/${hex}`,
      collapsible: false,
      collapsed: false,
    })

    if (isEdited(`${dir}/${filename}`, hex)) {
      editedFiles[fs.statSync(`${dir}/${filename}`).atime.toDateString()] = []
      editedFiles[fs.statSync(`${dir}/${filename}`).atime.toDateString()].push(
        filename.replace(/\.md$/, ``),
      )

      cachedLastEdited[hex] = fs
        .statSync(`${dir}/${filename}`)
        .atime.toDateString()
    }
  }
  finalTree.push(tmpTree)
}

fs.writeFileSync(
  `./assets/last-edited.json`,
  JSON.stringify(cachedLastEdited, null, 2),
)

const generateJournal = () => {
  Object.keys(editedFiles).forEach((date) => {
    const template = `
${
  fs.existsSync(`./data/journals/${date}.md`)
    ? ``
    : `## ${today.toDateString()}`
}
${editedFiles[date].map((f) => `- [[${f}]] `).join(`\n`)}`

    fs.writeFileSync(
      `./data/journals/${DateToString(new Date(date))}.md`,
      template,
      {
        flag: `a+`,
      },
    )
  })
}

generateJournal()
// iterate through Journal directory

const journalFiles = fs.readdirSync(`./data/journals`)
const journalTree: TreeNode = {
  title: `Journals`,
  children: [],
  collapsible: true,
  collapsed: true,
}
for (const filename of journalFiles) {
  const title = filename.replace(`.md`, ``)

  journalTree.children?.push({
    title,
    urlPath: `/${title}`, // for journals the title format should be fine to use as path
  })
}
finalTree.push(journalTree)

fs.writeFileSync(`./assets/tree.json`, JSON.stringify(finalTree, null, 2))

// write filenames to file
fs.writeFileSync(`./assets/filenames.json`, JSON.stringify(filenames, null, 2))
