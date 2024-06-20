import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    return res.status(200).json({
        host: req.headers.host,
        loc: req.headers[`x-vercel-ip-country`],
        ip: req.headers[`x-real-ip`],
        id: req.headers[`x-vercel-id`],
    })
}
