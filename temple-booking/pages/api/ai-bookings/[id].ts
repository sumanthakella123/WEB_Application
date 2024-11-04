import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Response for unimplemented methods
  res.status(405).end(`Method ${req.method} Not Allowed`);
}