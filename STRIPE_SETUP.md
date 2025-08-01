# Stripe Setup Guide

## 🚀 Getting Started with Stripe

### 1. Create a Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign up for a free account
3. Complete your account setup

### 2. Get Your API Keys
1. In your Stripe Dashboard, go to **Developers > API keys**
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory with the following content:

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_API_VERSION=2024-12-18.acacia
NODE_ENV=development
```

**Replace the placeholder values with your actual Stripe keys.**

### 4. Test the Integration
1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Try the "Transfer Money" feature or "Buy Now" on any item
4. Use Stripe's test card numbers:
   - **Card Number**: `4242 4242 4242 4242`
   - **Expiry**: Any future date (e.g., `12/25`)
   - **CVC**: Any 3 digits (e.g., `123`)

### 5. Features Available
- ✅ **Custom Transfer Amounts**: Users can enter any amount they want to transfer
- ✅ **Secure Payment Processing**: All payments go through Stripe
- ✅ **Item Posting**: Post items for sale with images and descriptions
- ✅ **Modern UI**: Clean, responsive design
- ✅ **Real-time Validation**: Form validation and error handling

### 6. Production Deployment
When ready for production:
1. Switch to **Live mode** in your Stripe Dashboard
2. Update environment variables with live keys
3. Deploy your application
4. Set up webhooks for production events

### 7. Security Notes
- Never commit your `.env.local` file to version control
- Keep your secret key secure and private
- Use test keys for development
- Monitor your Stripe Dashboard for any issues

## 🎯 Features Implemented

### Transfer Money Page (`/transfer`)
- Custom amount input
- Recipient information
- Secure Stripe payment processing
- Real-time validation
- Success confirmation

### Payment Page (`/payment`)
- Item-specific payments
- Custom amount support
- Stripe integration
- Order summary
- Security features

### Item Posting (`/post`)
- Image upload with preview
- Category selection
- Price and description
- Form validation
- Loading states

## 🔧 Troubleshooting

### Common Issues:
1. **"Stripe publishable key is not configured"**
   - Check your `.env.local` file exists
   - Verify the key starts with `pk_test_`

2. **"Payment failed"**
   - Use Stripe's test card numbers
   - Check browser console for errors
   - Verify API keys are correct

3. **"Module not found"**
   - Run `npm install` to install dependencies
   - Check package.json for correct versions

## 📞 Support
For Stripe-specific issues, check the [Stripe Documentation](https://stripe.com/docs)
For application issues, check the console logs and network tab in your browser's developer tools. 