import { useParams } from 'react-router-dom';
import { MockData } from '../data/MockData.js';
import { MapPin, Bed, Bath, Ruler, Calendar, Phone, Mail, ArrowLeft, Gavel, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { AuctionTimer } from '../components/AuctionTimer';
import { motion } from 'framer-motion';

const safeFormat = (value, isCurrency = false) => {
  if (value === undefined || value === null) return 'N/A';
  if (typeof value !== 'number') return 'N/A';
  
  try {
    const formatted = value.toLocaleString();
    return isCurrency ? `$${formatted}` : formatted;
  } catch {
    return 'N/A';
  }
};

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
        <p className="text-red-500 mb-6">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export function PropertyPage() {
  const { id } = useParams();
  
  const property = MockData.properties.find((p) => p.id === id) || {
    title: 'Unknown Property',
    location: 'Location not specified',
    images: [],
    features: [],
    agent: {
      name: 'Unknown Agent',
      title: 'Real Estate Agent',
      avatar: '',
      phone: '',
      email: ''
    }
  };

  const auction = MockData.auctions.find((a) => a.propertyId === id) || null;

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link 
              to="/properties" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Properties
            </Link>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                {property.images?.length > 0 ? (
                  property.images.map((img, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className={`relative h-64 overflow-hidden rounded-xl ${index === 0 ? 'sm:col-span-2' : ''}`}
                    >
                      <img
                        src={img}
                        alt={`${property.title || 'Property'} - ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
                        }}
                      />
                      {index === 0 && auction && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-md"
                        >
                          <Gavel className="h-4 w-4 mr-1" />
                          <span>Live Auction</span>
                        </motion.div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="sm:col-span-2 relative h-64 overflow-hidden rounded-xl bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No images available</p>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-between items-start gap-4 bg-white p-6 rounded-xl shadow-sm"
              >
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{property.title || 'Untitled Property'}</h1>
                  <div className="flex items-center text-gray-500 mt-2">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span>{property.location || 'Location not specified'}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {safeFormat(property.price, true)}
                  {auction && (
                    <div className="text-sm font-normal text-gray-500">
                      Current bid: {safeFormat(auction.currentBid, true)}
                    </div>
                  )}
                </div>
              </motion.div>

              {auction && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Live Auction</h3>
                    <AuctionTimer endTime={auction.endTime} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500">Current Bid</div>
                      <div className="text-xl font-bold">{safeFormat(auction.currentBid, true)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Bid Increment</div>
                      <div className="text-xl font-bold">{safeFormat(auction.bidIncrement, true)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Reserve Price</div>
                      <div className="text-xl font-bold">{safeFormat(auction.reservePrice, true)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Total Bidders</div>
                      <div className="text-xl font-bold">{auction.totalBidders}</div>
                    </div>
                  </div>
                  <Link 
                    to={`/properties/${id}/bid`}
                    className="block w-full text-center py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Gavel className="h-5 w-5 mr-2" />
                    Place Bid
                  </Link>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-4 gap-4 py-6 bg-white rounded-xl shadow-sm"
              >
                <div className="flex flex-col items-center">
                  <Bed className="h-6 w-6 text-blue-600" />
                  <span className="text-sm mt-2">{property.bedrooms || 'N/A'} Beds</span>
                </div>
                <div className="flex flex-col items-center">
                  <Bath className="h-6 w-6 text-blue-600" />
                  <span className="text-sm mt-2">{property.bathrooms || 'N/A'} Baths</span>
                </div>
                <div className="flex flex-col items-center">
                  <Ruler className="h-6 w-6 text-blue-600" />
                  <span className="text-sm mt-2">
                    {property.squareFeet ? `${safeFormat(property.squareFeet)} sq ft` : 'N/A'}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <span className="text-sm mt-2">{property.yearBuilt || 'N/A'}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-sm space-y-4"
              >
                <h3 className="text-xl font-semibold text-gray-900">Description</h3>
                <p className="text-gray-600">
                  {property.description || 'No description available.'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white p-6 rounded-xl shadow-sm space-y-4"
              >
                <h3 className="text-xl font-semibold text-gray-900">Features</h3>
                {property.features?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
                        <span className="text-gray-600">{feature || 'Unknown feature'}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No features listed.</p>
                )}
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Agent</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                    {property.agent?.avatar ? (
                      <img 
                        src={property.agent.avatar}
                        alt={property.agent.name || 'Agent'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150?text=Agent';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{property.agent?.name || 'Unknown Agent'}</h4>
                    <p className="text-sm text-gray-500">
                      {property.agent?.title || 'Real Estate Agent'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <a 
                    href={`tel:${property.agent?.phone || ''}`} 
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      property.agent?.phone 
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    } transition-colors`}
                  >
                    <Phone className="h-5 w-5" />
                    <span>{property.agent?.phone || 'Phone not available'}</span>
                  </a>
                  <a 
                    href={`mailto:${property.agent?.email || ''}`} 
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      property.agent?.email 
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    } transition-colors`}
                  >
                    <Mail className="h-5 w-5" />
                    <span>{property.agent?.email || 'Email not available'}</span>
                  </a>
                </div>

                <form className="space-y-4">
                  <input 
                    placeholder="Your name" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                  <textarea 
                    placeholder={`I'm interested in ${property.title || 'this property'}...`} 
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                  <button 
                    type="submit" 
                    className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>

              {auction && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl"
                >
                  <h3 className="text-xl font-semibold text-yellow-800 mb-3">Auction Notice</h3>
                  <ul className="space-y-3 text-yellow-700">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-800 mt-0.5">•</span>
                      <span>Auction ends {new Date(auction.endTime).toLocaleString()}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-800 mt-0.5">•</span>
                      <span>5% deposit required within 24 hours of winning</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-800 mt-0.5">•</span>
                      <span>All bids are legally binding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-800 mt-0.5">•</span>
                      <span>Buyer's premium may apply</span>
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}