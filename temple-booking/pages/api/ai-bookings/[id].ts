import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const bookingId = parseInt(id as string);

  res.status(405).end(`Method ${req.method} Not Allowed`);
}