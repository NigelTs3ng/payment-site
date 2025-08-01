import { NextResponse } from 'next/server';
import { getStripeServer } from '@/lib/stripe';

export async function POST(request) {
  try {
    const { amount, currency = 'usd', description } = await request.json();

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount provided' },
        { status: 400 }
      );
    }

    // Convert amount to cents (Stripe expects amounts in smallest currency unit)
    const amountInCents = Math.round(parseFloat(amount) * 100);

    const stripe = getStripeServer();

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency,
      description: description || 'Marketplace payment',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        amount: amount.toString(),
        currency: currency,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
} 