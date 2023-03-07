export const removeBacklinks = (content: string) => {
  let newContent = content
  const backlinks = content.matchAll(/.*\[\[(.+?)\]\].*/g)

  for (const b of backlinks) {
    newContent = newContent.replaceAll(`[[${b[1]}]]`, b[1])
  }
  return newContent
}
