export function getBacklinks(hex: string) {
  return backlinkingDocs.map((doc) => {
    const backlinks = [...doc.body.raw.matchAll(/.*\[\[(.+?)\]\].*/g)]

    return {
      title: doc.title,
      url: doc.type == `Journal` ? doc.slug : doc.hex,
      type: doc.type,
      text: backlinks[0][0],
    }
  })
}
