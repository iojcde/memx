import strip from 'strip-markdown'
import { remark } from 'remark'
import { removeBacklinks } from './removeBacklinks'

export const buildExcerpt = (content) => {
    const stripped = remark().use(strip).processSync(removeBacklinks(content))

    const final = `${String(stripped).trim().slice(0, 201)}${
        String(stripped).length > 200 ? `...` : ``
    }`
    return final
}
