import { allDocuments, DocumentTypes } from 'contentlayer/generated'

export function getBacklinks(slug: string) {
  const backlinkingDocs = allDocuments.filter((doc) =>
    doc.body.raw.includes(`[[` + slug),
  ) as DocumentTypes[]

  return backlinkingDocs.map((doc) => ({
    title: doc.title,
    url: doc.slug,
    type: doc.type,
  }))
}
