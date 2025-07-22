import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { mockData } from '../data/mockData';
import { ArrowLeft, Gavel, Clock, User, TrendingUp, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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

export function BidPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState('');
  const [bidError, setBidError] = useState('');
  const [bidSuccess, setBidSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find the auction and property
  const auction = mockData.auctions.find(a => a.propertyId === id);
  const property = mockData.properties.find(p => p.id === id);

  // Handle bid submission
  const handlePlaceBid = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBidError('');
    setBidSuccess(false);

    // Validate bid amount
    const amount = parseFloat(bidAmount);
    if (isNaN(amount)) {
      setBidError('Please enter a valid number');
      setIsSubmitting(false);
      return;
    }

    // Check minimum bid requirement
    const minBid = auction.currentBid + auction.bidIncrement;
    if (amount < minBid) {
      setBidError(`Bid must be at least $${minBid.toLocaleString()}`);
      setIsSubmitting(false);
      return;
    }

    // Check reserve price
    if (amount < auction.reservePrice) {
      setBidError(`Bid must meet the reserve price of $${auction.reservePrice.toLocaleString()}`);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call with timeout
    setTimeout(() => {
      // Update the current bid (in a real app, this would be an API call)
      auction.currentBid = amount;
      
      // Add to bid history
      auction.bids.push({
        amount: amount,
        bidder: 'user_123', // This would be the logged in user's ID
        bidderName: 'You', // This would be the logged in user's name
        time: new Date().toISOString()
      });

      auction.totalBidders += 1;
      
      setBidSuccess(true);
      setIsSubmitting(false);
      setBidAmount('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setBidSuccess(false), 5000);
    }, 1000);
  };

  if (!auction || !property) {
    return (
      <div className="container py-12 text-center">
        <h1 className="heading-1 mb-4">Auction Not Found</h1>
        <p className="section-description">
          The auction you're looking for doesn't exist or may have ended.
        </p>
        <Link to="/" className="btn-primary mt-6 inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-8">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-primary hover:text-primary/90 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Property
        </button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="heading-2">{property.title}</h1>
                <div className="flex items-center text-muted-foreground mt-2">
                  <Gavel className="h-4 w-4 mr-2 text-primary" />
                  <span>Live Auction</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-primary">
                Current Bid: {safeFormat(auction.currentBid, true)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-secondary border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="heading-3">Auction Timeline</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Started</span>
                    <span>{new Date(auction.startTime).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ends</span>
                    <span>{new Date(auction.endTime).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="capitalize">{auction.status}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-secondary border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="heading-3">Bidding Info</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Starting Bid</span>
                    <span>{safeFormat(auction.startingBid, true)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bid Increment</span>
                    <span>{safeFormat(auction.bidIncrement, true)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reserve Price</span>
                    <span>{safeFormat(auction.reservePrice, true)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Bidders</span>
                    <span>{auction.totalBidders}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-secondary border border-border">
              <h3 className="heading-3 mb-6">Place Your Bid</h3>
              
              {bidSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800">Your bid of {safeFormat(parseFloat(bidAmount), true)} has been placed successfully!</span>
                </div>
              )}
              
              <form onSubmit={handlePlaceBid} className="space-y-6">
                <div>
                  <label htmlFor="bidAmount" className="block text-sm font-medium text-muted-foreground mb-2">
                    Your Bid Amount (Minimum: {safeFormat(auction.currentBid + auction.bidIncrement, true)})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <input
                      id="bidAmount"
                      type="number"
                      min={auction.currentBid + auction.bidIncrement}
                      step={auction.bidIncrement}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition"
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
                      ? 'bg-primary/70 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary/90'
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
            </div>

            <div className="p-6 rounded-lg bg-secondary border border-border">
              <h3 className="heading-3 mb-6">Bidding History</h3>
              {auction.bids?.length > 0 ? (
                <div className="space-y-4">
                  {auction.bids.map((bid, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{bid.bidderName || `Bidder #${bid.bidder?.slice(0, 6) || 'N/A'}`}</span>
                      </div>
                      <div className="font-medium">
                        {safeFormat(bid.amount, true)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(bid.time).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No bids placed yet</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-secondary border border-border">
              <h3 className="heading-3 mb-4">Property Summary</h3>
              <div className="space-y-4">
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className="w-full h-48 object-cover rounded"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
                  }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                    <div>{property.bedrooms || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                    <div>{property.bathrooms || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Square Feet</div>
                    <div>{safeFormat(property.squareFeet)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Year Built</div>
                    <div>{property.yearBuilt || 'N/A'}</div>
                  </div>
                </div>
                <Link 
                  to={`/properties/${property.id}`} 
                  className="btn-secondary w-full inline-flex items-center justify-center"
                >
                  View Full Details
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-secondary border border-border">
              <h3 className="heading-3 mb-4">Auction Rules</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>All bids are binding and legally enforceable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>A 5% deposit is required within 24 hours of winning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Closing must occur within 30 days of auction end</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Buyer's premium may apply to final price</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Bids must meet or exceed the reserve price</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}