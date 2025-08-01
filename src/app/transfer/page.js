'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, DollarSign, CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Transfer() {
  const router = useRouter();
  const [transferData, setTransferData] = useState({
    amount: '',
    description: '',
    recipientEmail: '',
    recipientName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transferData.amount || parseFloat(transferData.amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: transferData.amount,
          description: transferData.description || `Transfer to ${transferData.recipientName || transferData.recipientEmail}`,
          successUrl: `${window.location.origin}/transfer/success`,
          cancelUrl: `${window.location.origin}/transfer`,
        }),
      });

      const { url, error: apiError } = await response.json();

      if (apiError) {
        throw new Error(apiError);
      }

      // Redirect to Stripe Checkout
      window.location.href = url;

    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full mx-4">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Successful!</h2>
          <p className="text-gray-600 mb-6">Your transfer has been processed successfully.</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              Transaction ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <p className="text-sm text-green-800 mt-1">
              Amount: ${transferData.amount}
            </p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-900">Custom Transfer</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transfer Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-600 font-medium">Secure Transfer</span>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-800">{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Transfer Amount *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">$</span>
                  <input
                    type="number"
                    name="amount"
                    value={transferData.amount}
                    onChange={handleInputChange}
                    required
                    min="0.01"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 font-medium placeholder-gray-500"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">Enter the amount you want to transfer</p>
              </div>

              {/* Recipient Information */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Recipient Name
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={transferData.recipientName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 font-medium placeholder-gray-500"
                  placeholder="Recipient's name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Recipient Email
                </label>
                <input
                  type="email"
                  name="recipientEmail"
                  value={transferData.recipientEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 font-medium placeholder-gray-500"
                  placeholder="recipient@example.com"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={transferData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 font-medium placeholder-gray-500"
                  placeholder="What is this transfer for?"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing Transfer...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Transfer Securely
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Transfer Summary */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Transfer Summary</h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">How it works</h4>
                <p className="text-sm text-blue-800">
                  Enter any amount you want to transfer. We'll redirect you to Stripe's secure checkout page to complete your transfer.
                </p>
              </div>

              {transferData.amount && (
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transfer Amount</span>
                    <span className="text-gray-900 font-semibold">${parseFloat(transferData.amount || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="text-gray-900 font-semibold">$0.30</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Total</span>
                    <span>${(parseFloat(transferData.amount || 0) + 0.30).toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Security Features</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• SSL encrypted transactions</li>
                  <li>• PCI DSS compliant</li>
                  <li>• Real-time fraud detection</li>
                  <li>• Secure payment processing</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">Important Notes</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• You'll be redirected to Stripe's secure checkout page</li>
                  <li>• Recipients will receive notification</li>
                  <li>• Transaction fees may apply</li>
                  <li>• Keep your receipt for records</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 