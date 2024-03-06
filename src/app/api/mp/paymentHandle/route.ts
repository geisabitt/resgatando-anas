import { NextApiRequest, NextApiResponse } from 'next';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return handlePost(req, res);
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { paymentCreateRequest } = req.body;

    const paymentsData = JSON.parse(localStorage.getItem('payments') || '[]');
    paymentsData.push(paymentCreateRequest);
    localStorage.setItem('payments', JSON.stringify(paymentsData));

    res.status(200).json({ success: true, message: 'Payment created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}