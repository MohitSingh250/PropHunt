import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function BidConfirmation() {
  const { state } = useLocation();
  const { bidAmount, property, auction } = state || {};

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Confirmation</h2>
          <p className="text-gray-600 mb-6">The confirmation page cannot be accessed directly.</p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg text-center"
      >
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Bid Successfully Placed!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Your bid of <span className="font-semibold text-blue-600">${bidAmount.toLocaleString()}</span> has been submitted for <span className="font-medium">{property.title}</span>.
        </p>

        <div className="space-y-4">
          <a
            href={`/properties/${property.id}`}
            className="block w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Property
          </a>
          
          <a
            href={`/auctions/${auction.id}`}
            className="block w-full px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Auction Status
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            You'll receive an email confirmation shortly. Check your bids in the <a href="/dashboard" className="text-blue-600 hover:underline">Dashboard</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}