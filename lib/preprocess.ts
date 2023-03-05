import fs from 'fs'

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
  fs.readFileSync(`./data/last-edited.json`, `utf-8`),
)

const isEdited = (filename: string, hex: string) => {
  const a = cachedLastEdited[hex]
  if (a) {
    if (a != fs.statSync(filename).atime.toDateString()) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

const editedFiles: string[] = []
const filenames: Record<string, string> = {} // { hex: filename }
const today = new Date()

// loop through files
for (const dir of [`./data/research`, `./data/blog`]) {
  const files = fs.readdirSync(dir)

  for (const filename of files) {
    // read in file
    const fileContent = fs.readFileSync(`${dir}/${filename}`, `utf8`)
    compileBacklinks(fileContent, filename)

    const hex = getHex(fileContent, filename, dir)
    filenames[
      filename.replace(/\.md$/, ``).replaceAll(` `, `-`).toLowerCase()
    ] = hex

    if (isEdited(`${dir}/${filename}`, hex)) {
      editedFiles.push(filename.replace(/\.md$/, ``))

      cachedLastEdited[hex] = today.toDateString()
    }
  }
}

fs.writeFileSync(
  `./data/last-edited.json`,
  JSON.stringify(cachedLastEdited, null, 2),
)

const generateJournal = () => {
  const template = `
${
  fs.existsSync(`./data/journals/${DateToString(today)}.md`)
    ? ``
    : `## ${today.toDateString()}`
}
${editedFiles.map((f) => `- [[${f}]] `).join(`\n`)}`

  return template
}
fs.writeFileSync(
  `./data/journals/${DateToString(today)}.md`,
  generateJournal(),
  { flag: `a+` },
)

// write filenames to file
fs.writeFileSync(`./data/filenames.json`, JSON.stringify(filenames, null, 2))
