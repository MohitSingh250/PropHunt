import { useParams } from 'react-router-dom';
import { mockData } from '../data/mockData';
import { MapPin, Bed, Bath, Ruler, Calendar, Phone, Mail, ArrowLeft, Gavel, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { AuctionTimer } from '../components/AuctionTimer';
import { BidForm } from '../components/BidForm';

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
    <div className="container py-12 text-center">
      <h1 className="heading-1 mb-4">Something went wrong</h1>
      <p className="text-red-500 mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="btn-primary inline-flex items-center"
      >
        Try again
      </button>
    </div>
  );
}

export function PropertyPage() {
  const { id } = useParams();
  
  const property = mockData.properties.find((p) => p.id === id) || {
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

  const auction = mockData.auctions.find((a) => a.propertyId === id) || null;

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <div className="bg-background min-h-screen">
        <div className="container py-8">
          <Link 
            to="/properties" 
            className="mb-6 inline-flex items-center text-primary hover:text-primary/90 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {property.images?.length > 0 ? (
                  property.images.map((img, index) => (
                    <div 
                      key={index} 
                      className={`relative h-64 overflow-hidden rounded-xl ${index === 0 ? 'sm:col-span-2' : ''}`}
                    >
                      <img
                        src={img}
                        alt={`${property.title || 'Property'} - ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
                        }}
                      />
                      {index === 0 && auction && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <Gavel className="h-4 w-4 mr-1" />
                          <span>Live Auction</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="sm:col-span-2 relative h-64 overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-500">No images available</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="heading-2">{property.title || 'Untitled Property'}</h1>
                  <div className="flex items-center text-muted-foreground mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location || 'Location not specified'}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {safeFormat(property.price, true)}
                  {auction && (
                    <div className="text-sm font-normal text-muted-foreground">
                      Current bid: {safeFormat(auction.currentBid, true)}
                    </div>
                  )}
                </div>
              </div>

              {auction && (
                <div className="p-6 rounded-lg bg-secondary border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="heading-3">Live Auction</h3>
                    <AuctionTimer endTime={auction.endTime} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-muted-foreground">Current Bid</div>
                      <div className="text-xl font-bold">{safeFormat(auction.currentBid, true)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Bid Increment</div>
                      <div className="text-xl font-bold">{safeFormat(auction.bidIncrement, true)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Reserve Price</div>
                      <div className="text-xl font-bold">{safeFormat(auction.reservePrice, true)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Bidders</div>
                      <div className="text-xl font-bold">{auction.totalBidders}</div>
                    </div>
                  </div>
                  <Link 
                    to={`/properties/${id}/bid`}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    <Gavel className="h-4 w-4 mr-2" />
                    Place Bid
                  </Link>
                </div>
              )}

              <div className="grid grid-cols-4 gap-4 py-6 border-y border-border">
                <div className="flex flex-col items-center">
                  <Bed className="h-5 w-5 text-primary" />
                  <span className="text-sm mt-1">{property.bedrooms || 'N/A'} Beds</span>
                </div>
                <div className="flex flex-col items-center">
                  <Bath className="h-5 w-5 text-primary" />
                  <span className="text-sm mt-1">{property.bathrooms || 'N/A'} Baths</span>
                </div>
                <div className="flex flex-col items-center">
                  <Ruler className="h-5 w-5 text-primary" />
                  <span className="text-sm mt-1">
                    {property.squareFeet ? `${safeFormat(property.squareFeet)} sq ft` : 'N/A'}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-sm mt-1">{property.yearBuilt || 'N/A'}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="heading-3">Description</h3>
                <p className="text-muted-foreground">
                  {property.description || 'No description available.'}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="heading-3">Features</h3>
                {property.features?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        <span>{feature || 'Unknown feature'}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No features listed.</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-secondary border border-border">
                <h3 className="heading-3 mb-4">Contact Agent</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-background overflow-hidden border border-border">
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
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{property.agent?.name || 'Unknown Agent'}</h4>
                    <p className="text-sm text-muted-foreground">
                      {property.agent?.title || 'Real Estate Agent'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <a 
                    href={`tel:${property.agent?.phone || ''}`} 
                    className={`flex items-center gap-2 ${property.agent?.phone ? 'text-muted-foreground hover:text-primary' : 'text-gray-400 cursor-not-allowed'} transition-colors`}
                  >
                    <Phone className="h-4 w-4" />
                    {property.agent?.phone || 'Phone not available'}
                  </a>
                  <a 
                    href={`mailto:${property.agent?.email || ''}`} 
                    className={`flex items-center gap-2 ${property.agent?.email ? 'text-muted-foreground hover:text-primary' : 'text-gray-400 cursor-not-allowed'} transition-colors`}
                  >
                    <Mail className="h-4 w-4" />
                    {property.agent?.email || 'Email not available'}
                  </a>
                </div>

                <form className="space-y-4">
                  <input 
                    placeholder="Your name" 
                    className="w-full px-4 py-2 rounded border border-border focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition"
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="w-full px-4 py-2 rounded border border-border focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition"
                    required
                  />
                  <textarea 
                    placeholder={`I'm interested in ${property.title || 'this property'}...`} 
                    rows={3}
                    className="w-full px-4 py-2 rounded border border-border focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition"
                  />
                  <button 
                    type="submit" 
                    className="btn-primary w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary/90 transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {auction && (
                <div className="p-6 rounded-lg bg-yellow-50 border border-yellow-200">
                  <h3 className="heading-3 mb-3 text-yellow-800">Auction Notice</h3>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Auction ends {new Date(auction.endTime).toLocaleString()}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>5% deposit required within 24 hours of winning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>All bids are legally binding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Buyer's premium may apply</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}