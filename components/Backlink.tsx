import React from 'react'

const processBacklinkItem = (text: string, title: string) => {
  text = text
    .trim()
    .replace(/&/g, `&amp;`)
    .replace(/</g, `&lt;`)
    .replace(/>/g, `&gt;`)
    .replace(/"/g, `&quot;`)
    .replace(/'/g, `&#039;`)

  try {
    // Replace [[title|display]] with `<b class="${styles.highlight}">${display}</b>` with regex
    const regex1 = new RegExp(`\\[\\[${title}\\|(.+?)\\]\\]`, `g`)
    text = text.replace(regex1, `<b>$1</b>`)

    // Replace [[title]] with `<b class="${styles.highlight}">${title}</b>` with regex
    const regex2 = new RegExp(`\\[\\[${title}\\]\\]`, `g`)
    text = text.replace(regex2, `<b>${title}</b>`)

    // Replace [[other text|display]] with display. other can include spaces
    const regex3 = new RegExp(`\\[\\[(. +?)\\|(. +?)\\]\\]`, `g`)
    text = text.replace(regex3, `$2`)

    // Replace [[other]] with other
    const regex4 = new RegExp(`\\[\\[(.+?)\\]\\]`, `g`)
    text = text.replace(regex4, `$1`)
  } catch (e) {
    // console.warn(`Error processing backlink item with text: ${text} and title: ${title}\n${e}`)
  }

  return (
    <pre
      dangerouslySetInnerHTML={{
        __html: text.trim(),
      }}
    />
  )
}

const Backlink = ({ backlinks }) => {
  return (
    <div>
      Links to this page
      {backlinks.map((backlink) => (
        <div key={backlink.url}>
          {processBacklinkItem(backlink.text, backlink.title)}
        </div>
      ))}
    </div>
  )
}
export default Backlink
