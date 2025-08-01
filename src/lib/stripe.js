import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Client-side Stripe instance
export const getStripeClient = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error('Stripe publishable key is not configured');
  }
  return loadStripe(publishableKey);
};

// Server-side Stripe instance
export const getStripeServer = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Stripe secret key is not configured');
  }
  return new Stripe(secretKey, {
    apiVersion: process.env.STRIPE_API_VERSION || '2024-12-18.acacia',
  });
};

// Validate Stripe configuration
export const validateStripeConfig = () => {
  const requiredEnvVars = [
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_SECRET_KEY'
  ];

  const missingVars = requiredEnvVars.filter(
    varName => !process.env[varName]
  );

  if (missingVars.length > 0) {
    console.error('Missing required Stripe environment variables:', missingVars);
    return false;
  }

  return true;
}; 