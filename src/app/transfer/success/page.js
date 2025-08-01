'use client';

import { useEffect, useState, Suspense } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function TransferSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [transferStatus, setTransferStatus] = useState('processing');

  useEffect(() => {
    // Check if we're coming from a successful checkout session
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      // In a real app, you would verify the session with your backend
      setTransferStatus('success');
    } else {
      // If no session_id, assume success for demo purposes
      // In production, you'd want to verify the payment status
      setTransferStatus('success');
    }
  }, [searchParams]);

  if (transferStatus === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full mx-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Transfer...</h2>
          <p className="text-gray-600">Please wait while we verify your transfer.</p>
        </div>
      </div>
    );
  }

  if (transferStatus === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full mx-4">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">✕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Failed</h2>
          <p className="text-gray-600 mb-6">There was an issue processing your transfer. Please try again.</p>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full mx-4">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Successful!</h2>
        <p className="text-gray-600 mb-6">Your transfer has been processed successfully.</p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-800">
            Session ID: {searchParams.get('session_id') || 'N/A'}
          </p>
          <p className="text-sm text-green-800 mt-1">
            Payment Method: Stripe Checkout
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={() => router.push('/transfer')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Make Another Transfer
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TransferSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full mx-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we load the success page.</p>
        </div>
      </div>
    }>
      <TransferSuccessContent />
    </Suspense>
  );
} 