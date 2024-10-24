// pages/api/send-seva-email.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';
import { sendBookingConfirmation } from '../../utils/mailer';
import { BookingDetails } from '../../types/booking';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    bookingDetails: BookingDetails;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { bookingDetails } = req.body;

  

    // Send confirmation email
    await sendBookingConfirmation(bookingDetails);

    return res.status(200).json({ 
      message: 'Booking confirmed! A confirmation email has been sent to your email address.',
      newBooking 
    });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({ error: 'Failed to process booking. Please try again.' });
  }
}