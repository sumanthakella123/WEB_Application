import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const bookingId = parseInt(id as string);

  switch (req.method) {
    case 'PUT':
      return res.status(501).json({ message: 'Update functionality not implemented yet' });

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}