import fs from 'fs'

const getHex = (content: string, filename: string) => {
  // go through each file in directory to see if frontmatter contains hex
  // if it doesn't, create a new hex and assign it to the file

  // check if file contains hex
  const hasHex = content.includes(`hex:`) && content.includes(`---`)
  // if it doesn't, create a new hex and assign it to the file
  if (hasHex) {
    const hex = content.match(/hex: (.+)/)?.[1] as string

    return hex
  } else {
    console.log(`adding hex to ${filename}`)
    const newHex = Math.floor(Math.random() * 16777215)
      .toString(16)
      .toUpperCase()

    //if it doesn't have frontmatter, add it
    if (!content.includes(`---`)) {
      content = `---\n` + content
    }

    const newContent = content.replace(/---/, `---\nhex: ${newHex}\n---`)

    console.log(`assigning hex ${newHex} to `, filename)

    fs.writeFileSync(`./data/research/${filename}`, newContent)
    return newHex
  }
}

const allBacklinks: Record<string, Record<string, string>> = {}

const compileBacklinks = (content: string, filename: string) => {
  const title = filename.replace(`.mdx`, ``)

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

// read in all files in directory
const files = fs.readdirSync(`./data/research`)

const filenames: Record<string, string> = {} // { hex: filename }

// loop through files
for (const filename of files) {
  // read in file
  const fileContent = fs.readFileSync(`./data/research/${filename}`, `utf8`)
  compileBacklinks(fileContent, filename)

  const hex = getHex(fileContent, filename)
  filenames[
    filename
      .replace(/\.mdx$/, ``)
      .replace(` `, `-`)
      .toLowerCase()
  ] = hex

  // write filenames to file
  fs.writeFileSync(`./data/filenames.json`, JSON.stringify(filenames, null, 2))
}
