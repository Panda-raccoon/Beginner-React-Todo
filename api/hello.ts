// import axios from 'axios'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function (req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    name: 'panda',
    age: 85
  })
}