import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandle';
import Config from './app/Config';
import PermitTutor from './app/modules/sendPermitTutor/permitTutor.mode';

const app: Application = express();

app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:3000'], // allow multiple origins
  credentials: true, // allow cookies, authorization headers, etc.
};

// Apply CORS with options
app.use(cors(corsOptions));
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Welcome to tutor link ');
});


// eslint-disable-next-line @typescript-eslint/no-require-imports

const stripe = require('stripe')(Config.stripe_sk);

app.post('/create-checkout-session', async (req, res) => {
  console.log('test');
  try {

    const { data } = req.body;

    console.log('data', data);

    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: data.tutorId.name,
          },
          unit_amount: Math.round(data.price * 100),
        },
        quantity: 1, // Ensure quantity is included
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',

      success_url: `http://localhost:3000/sucess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: 'http://localhost:3000/failed',
      metadata: {
        email: data.userEmail,
        totalPrice: data.price,
        isPayment: data.isPayment,
        id: data._id,

      },
    });

    // const paymentConfirmation = await stripe.checkout.sessions.retrieve(
    //   session.id,
    // );

    console.log('paymentConfirmation', session);
    // const paymentIntent = await stripe.paymentIntents.retrieve(session.id);

    // console.log(`Payment status: ${paymentIntent.status}`);

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

app.get('/checkout-session/:sessionId', async (req: Request, res: Response) => {


  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.params.sessionId,
    );

    console.log('Payment session details:', session);

    const { email, id, isPayment, totalPrice } = session.metadata;

    // Now fetch Tutor  permit data
    const tutorPermit = await PermitTutor.findByIdAndUpdate(
      id,
      {
        isPayment: true,
      },
      { new: true },
    ); // Assuming `Product` is your Mongoose model

    if (!tutorPermit) {
      return res.status(404).json({ error: 'tutorPermit not found' });
    }

    res.json({
      // paymentStatus: session.payment_status,
      // userEmail: email,

      // productPrice: totalPrice,
      tutorPermit,
   
    });
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    res.status(500).json({ error: 'Failed to retrieve session details' });
  }
});
app.use(globalErrorHandler);

export const App = app;
