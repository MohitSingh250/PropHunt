import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MockData } from '../data/mockdata';
import { ArrowLeft, Gavel, Clock, User, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const safeFormat = (value, isCurrency = false) => {
  if (value === undefined || value === null || value === '') return 'N/A';
  
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) return 'N/A';
  
  try {
    const formatted = num.toLocaleString();
    return isCurrency ? `$${formatted}` : formatted;
  } catch {
    return 'N/A';
  }
};

export function BidPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState('');
  const [bidError, setBidError] = useState('');
  const [bidSuccess, setBidSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const auction = MockData.auctions.find(a => a.propertyId === id);
  const property = MockData.properties.find(p => p.id === id);

  const handlePlaceBid = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBidError('');
    setBidSuccess(false);

    const amount = parseFloat(bidAmount);
    if (isNaN(amount)) {
      setBidError('Please enter a valid number');
      setIsSubmitting(false);
      return;
    }

    const minBid = auction.currentBid + auction.bidIncrement;
    if (amount < minBid) {
      setBidError(`Bid must be at least $${minBid.toLocaleString()}`);
      setIsSubmitting(false);
      return;
    }

    if (amount < auction.reservePrice) {
      setBidError(`Bid must meet the reserve price of $${auction.reservePrice.toLocaleString()}`);
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      auction.currentBid = amount;
      auction.bids.push({
        amount: amount,
        bidder: 'user_123',
        bidderName: 'You',
        time: new Date().toISOString()
      });
      auction.totalBidders += 1;
      
      setBidSuccess(true);
      setIsSubmitting(false);
      setBidAmount('');
      setTimeout(() => setBidSuccess(false), 5000);
    }, 1000);
  };

  if (!auction || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Auction Not Found</h1>
          <p className="text-gray-600 mb-6">
            The auction you're looking for doesn't exist or may have ended.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Property
        </button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm"
            >
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
                <div className="flex items-center text-gray-500 mt-1">
                  <Gavel className="h-5 w-5 mr-2 text-blue-600" />
                  <span>Live Auction</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
                Current Bid: {safeFormat(auction.currentBid, true)}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Auction Timeline</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Started</span>
                    <span className="font-medium">{new Date(auction.startTime).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Ends</span>
                    <span className="font-medium">{new Date(auction.endTime).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="capitalize font-medium">{auction.status}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Bidding Info</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Starting Bid</span>
                    <span className="font-medium">{safeFormat(auction.startingBid, true)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bid Increment</span>
                    <span className="font-medium">{safeFormat(auction.bidIncrement, true)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Reserve Price</span>
                    <span className="font-medium">{safeFormat(auction.reservePrice, true)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Bidders</span>
                    <span className="font-medium">{auction.totalBidders}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Place Your Bid</h3>
              
              {bidSuccess && (
  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
    <span className="text-green-800">
      {bidAmount 
        ? `Your bid of ${safeFormat(bidAmount, true)} has been placed successfully!`
        : 'Your bid has been placed successfully!'}
    </span>
  </div>
)}
              
              <form onSubmit={handlePlaceBid} className="space-y-6">
                <div>
                  <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Bid Amount (Minimum: {safeFormat(auction.currentBid + auction.bidIncrement, true)})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      id="bidAmount"
                      type="number"
                      min={auction.currentBid + auction.bidIncrement}
                      step={auction.bidIncrement}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder={`Enter amount (min ${safeFormat(auction.currentBid + auction.bidIncrement, true)})`}
                      required
                    />
                  </div>
                  {bidError && <p className="mt-2 text-sm text-red-600">{bidError}</p>}
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Important Notice</h4>
                  <p className="text-sm text-yellow-700">
                    By placing a bid, you agree to our terms and conditions. All bids are legally binding. 
                    A 5% deposit will be required if you win the auction.
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                    isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white transition-colors`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Gavel className="h-5 w-5 mr-2" />
                      Place Bid
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Bidding History</h3>
              {auction.bids?.length > 0 ? (
                <div className="space-y-3">
                  {auction.bids.map((bid, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-400" />
                        <span className="font-medium">{bid.bidderName || `Bidder #${bid.bidder?.slice(0, 6) || 'N/A'}`}</span>
                      </div>
                      <div className="font-bold text-blue-600">
                        {safeFormat(bid.amount, true)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(bid.time).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No bids placed yet</p>
              )}
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Summary</h3>
              <div className="space-y-4">
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
                  }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Bedrooms</div>
                    <div className="font-medium">{property.bedrooms || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Bathrooms</div>
                    <div className="font-medium">{property.bathrooms || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Square Feet</div>
                    <div className="font-medium">{safeFormat(property.squareFeet)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Year Built</div>
                    <div className="font-medium">{property.yearBuilt || 'N/A'}</div>
                  </div>
                </div>
                <Link 
                  to={`/properties/${property.id}`} 
                  className="block w-full text-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  View Full Details
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Auction Rules</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5">•</div>
                  <span className="text-gray-700">All bids are binding and legally enforceable</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5">•</div>
                  <span className="text-gray-700">A 5% deposit is required within 24 hours of winning</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5">•</div>
                  <span className="text-gray-700">Closing must occur within 30 days of auction end</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5">•</div>
                  <span className="text-gray-700">Buyer's premium may apply to final price</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5">•</div>
                  <span className="text-gray-700">Bids must meet or exceed the reserve price</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}