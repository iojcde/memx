import type { NextApiHandler } from 'next'
import ImageKit from 'imagekit'

const imagekit = new ImageKit({
  publicKey: `public_iNz2rODUT9E2m2UAs0hC418eyJA=`,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: `https://ik.imagekit.io/cl2zf5ydalng`,
})
const handler: NextApiHandler = async (req, res) => {
  const { src, w, q } = req.query
  const imageURL = imagekit.url({
    path: `/images/banner.jpg`,
    transformation: [
      {
        width: w as string,
        quality: (q as string) || `75`,
        overlayText: src as string,
        overlayTextFontFamily: `Inter-roman.var_PB0aSMGKnrm.woff2`,
      },
    ],
    signed: true,
    expireSeconds: 300,
  })
  res.setHeader(
    `cache-control`,
    `public, s-maxage=15552000, max-age=15552000, must-revalidate`,
  )
  await fetch(imageURL, {
    headers: {
      accept: req.headers.accept,
    },
  }).then((response) => {
    res.setHeader(`content-type`, response.headers.get(`content-type`))

    res.setHeader(`vary`, response.headers.get(`vary`))
    res.setHeader(`content-length`, response.headers.get(`content-length`))
    res.send(response.body)
  })
}

export default handler
