import { Link } from 'react-router-dom';
import { AuctionTimer } from './AuctionTimer';

export function AuctionCard({ auction, property }) {
    return (
      <Link 
        to={`/properties/${property.id}`} 
        className="border border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-all bg-[#0F0F0F] text-white"
      >
        <div className="relative h-48">
          <img 
            src={property.images[0] || '/placeholder.jpg'} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
            <h3 className="text-white font-bold text-lg">{property.title}</h3>
            <p className="text-gray-300 text-sm">{property.location}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Current Bid</span>
            <span className="text-white font-bold">${auction.currentBid.toLocaleString()}</span>
          </div>
          <AuctionTimer endTime={auction.endTime} />
          <div className="flex gap-4 mt-4 text-sm text-gray-300">
            <span>{property.bedrooms} Beds</span>
            <span>{property.bathrooms} Baths</span>
            <span>{property.squareFeet} sq ft</span>
          </div>
        </div>
        <div className="p-4 border-t border-gray-700">
          <button className="w-full bg-white text-gray-900 font-medium rounded-md py-2 hover:bg-gray-100 transition-colors">
            Bid Now
          </button>
        </div>
      </Link>
    );
  }