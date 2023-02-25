import { allDocuments, DocumentTypes } from 'contentlayer/generated'
import filenames from 'data/filenames.json'

export function getBacklinks(hex: string) {
  const backlinkingDocs = allDocuments.filter(
    (doc) =>
      doc.body.raw
        .toLowerCase()
        .includes(`[[` + hex.toLowerCase().replace(`-`, ` `)) ||
      doc.body.raw.toLowerCase().includes(
        `[[` +
          Object.keys(filenames)
            ?.find((f) => filenames[f] === hex.toUpperCase())
            ?.toLowerCase()
            .replace(`-`, ` `),
      ),
  ) as DocumentTypes[]

  return backlinkingDocs.map((doc) => {
    const backlinks = [...doc.body.raw.matchAll(/.*\[\[(.+?)\]\].*/g)]

    return {
      title: backlinks[0][1],
      url: doc.hex,
      type: doc.type,
      text: backlinks[0][0],
    }
  })
}
