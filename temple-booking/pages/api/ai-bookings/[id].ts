import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const bookingId = parseInt(id as string);

  // Validate bookingId
  if (isNaN(bookingId)) {
    return res.status(400).json({ message: 'Invalid booking ID provided' });
  }

  switch (req.method) {
    case 'PUT':
      try {
        // Validate request body
        const { name, email, phone, pujaName } = req.body;
        if (!name || !email || !phone || !pujaName) {
          console.error('Validation error: Missing required fields');
          return res.status(400).json({ message: 'Missing required fields: name, email, phone, or pujaName' });
        }

        const updatedBooking = await prisma.aI_Booking.update({
          where: { id: bookingId },
          data: { name, email, phone, pujaName },
        });

        console.log(`Booking with ID ${bookingId} updated successfully.`);
        return res.status(200).json(updatedBooking);
      } catch (error) {
        console.error(`Error updating booking with ID ${bookingId}:`, error);
        return res.status(500).json({ message: 'An error occurred while updating the booking' });
      }

    case 'DELETE':
      try {
        const deletedBooking = await prisma.aI_Booking.delete({
          where: { id: bookingId },
        });

        console.log(`Booking with ID ${bookingId} deleted successfully.`);
        return res.status(200).json({ message: 'Booking deleted successfully', deletedBooking });
      } catch (error) {
        console.error(`Error deleting booking with ID ${bookingId}:`, error);
        return res.status(500).json({ message: 'An error occurred while deleting the booking' });
      }

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}