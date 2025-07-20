import { useParams } from 'react-router-dom'; 
import { BidForm } from '../components/BidForm';
import { AuctionTimer } from '../components/AuctionTimer';
import { mockData } from '../data/mockData';
import { MapPin, Bed, Bath, Ruler, Calendar, Phone, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PropertyPage() {
  const { id } = useParams();
  const property = mockData.properties.find((p) => p.id === id);
  const auction = mockData.auctions.find((a) => a.propertyId === id);

  if (!property) {
    return (
      <div className="container py-12 text-center">
        <h1 className="heading-1 mb-4">Property Not Found</h1>
        <p className="section-description">
          The property you're looking for doesn't exist or may have been removed.
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
              {property.images.map((img, index) => (
                <div 
                  key={index} 
                  className={`relative h-64 overflow-hidden rounded-xl ${index === 0 ? 'sm:col-span-2' : ''}`}
                >
                  <img
                    src={img}
                    alt={`${property.title} - ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="heading-2">{property.title}</h1>
                <div className="flex items-center text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-primary">
                ${property.price.toLocaleString()}
                {auction && (
                  <div className="text-sm font-normal text-muted-foreground">
                    Current bid: ${auction.currentBid.toLocaleString()}
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
                    <div className="text-xl font-bold">${auction.currentBid.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Bid Increment</div>
                    <div className="text-xl font-bold">${auction.bidIncrement.toLocaleString()}</div>
                  </div>
                </div>
                <BidForm auction={auction} />
              </div>
            )}

            <div className="grid grid-cols-4 gap-4 py-6 border-y border-border">
              <div className="flex flex-col items-center">
                <Bed className="h-5 w-5 text-primary" />
                <span className="text-sm mt-1">{property.bedrooms} Beds</span>
              </div>
              <div className="flex flex-col items-center">
                <Bath className="h-5 w-5 text-primary" />
                <span className="text-sm mt-1">{property.bathrooms} Baths</span>
              </div>
              <div className="flex flex-col items-center">
                <Ruler className="h-5 w-5 text-primary" />
                <span className="text-sm mt-1">{property.squareFeet.toLocaleString()} sq ft</span>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm mt-1">{property.yearBuilt}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="heading-3">Description</h3>
              <p className="text-muted-foreground">{property.description}</p>
            </div>

            <div className="space-y-4">
              <h3 className="heading-3">Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="agent-contact-card">
              <h3 className="heading-3">Contact Agent</h3>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-secondary overflow-hidden">
                  <img 
                    src={property.agent.avatar} 
                    alt={property.agent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{property.agent.name}</h4>
                  <p className="text-sm text-muted-foreground">{property.agent.title}</p>
                </div>
              </div>

              <div className="space-y-3">
                <a 
                  href={`tel:${property.agent.phone}`} 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {property.agent.phone}
                </a>
                <a 
                  href={`mailto:${property.agent.email}`} 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {property.agent.email}
                </a>
              </div>

              <form className="space-y-4">
                <input 
                  placeholder="Your name" 
                  className="form-input"
                  required
                />
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="form-input"
                  required
                />
                <textarea 
                  placeholder={`I'm interested in ${property.title}...`} 
                  rows={3}
                  className="form-input"
                />
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>

            <div className="agent-contact-card">
              <h3 className="heading-3">Schedule a Tour</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Arrange a private viewing of this property with the agent.
              </p>
              <button className="btn-secondary w-full">
                Request Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PropertyPage;