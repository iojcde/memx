import type { NextApiHandler } from 'next'
import ImageKit from 'imagekit'

import { allBlogs } from '.contentlayer/data'

const imagekit = new ImageKit({
  publicKey: `public_iNz2rODUT9E2m2UAs0hC418eyJA=`,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: `https://ik.imagekit.io/cl2zf5ydalng`,
})
const handler: NextApiHandler = async (req, res) => {
  const { slug, w, q } = req.query
  const post = allBlogs.find((post) => post.slug === (slug as string))

  const imageURL = imagekit.url({
    path: `/images/banner.jpg`,
    transformation: [
      {
        width: w as string,
        aspectRatio: `1.91-1`,
        overlayX: `60`,
        overlayY: (((parseInt(w as string) / 16) * 9) / 3).toString(),
        quality: (q as string) || `80`,
        overlayText: encodeURIComponent(post.title),
        overlayTextFontSize: `80`,
        overlayTextFontFamily: `Inter-SemiBold_TXEoYv9nk.ttf`,
        overlayTextTypography: `b`,
        overlayTextColor: `FFFFFF`,
      },
      {
        overlayImage: `/images/social-template.png`,
      },
    ],
    signed: true,
    expireSeconds: 300,
  })
  // res.setHeader(
  //   `cache-control`,
  //   `public, s-maxage=15552000, max-age=15552000, must-revalidate`,
  // )
  console.log(imageURL)
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
