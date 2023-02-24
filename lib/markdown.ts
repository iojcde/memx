import { allDocuments, DocumentTypes } from 'contentlayer/generated'

export function getBacklinks(hex: string) {
  const backlinkingDocs = allDocuments.filter((doc) =>
    doc.body.raw
      .toLowerCase()
      .includes(`[[` + hex.toLowerCase().replace(`-`, ` `)),
  ) as DocumentTypes[]
  console.log(backlinkingDocs)

  return backlinkingDocs.map((doc) => {
    const backlinks = [...doc.body.raw.matchAll(/.*\[\[(.+?)\]\].*/g)]

    return {
      title: doc.title,
      url: doc.hex,
      type: doc.type,
      text: backlinks[0][0],
    }
  })
}
