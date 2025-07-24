import { Link } from 'react-router-dom';
import { AuctionTimer } from './AuctionTimer';
import { Gavel, MapPin, Bed, Bath, Ruler } from 'lucide-react';

export function AuctionCard({ auction, property }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <Link to={`/properties/${property.id}`} className="block relative h-60 w-full overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
          LIVE
        </div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h3 className="text-white font-bold text-lg">{property.title}</h3>
          <div className="flex items-center text-slate-300 text-sm">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{property.location}</span>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-slate-500 text-sm">Current Bid</span>
          <span className="font-bold text-slate-800">${auction.currentBid.toLocaleString()}</span>
        </div>
        
        <AuctionTimer endTime={auction.endTime} />
        
        <div className="flex gap-4 mt-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Bed className="h-3 w-3" /> {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-3 w-3" /> {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Ruler className="h-3 w-3" /> {property.squareFeet} sq ft
          </span>
        </div>
      </div>
      
      <div className="border-t border-slate-100 p-4">
        <Link to={`/properties/${property.id}/bid`}>
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg py-2 px-4 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
            Place Bid
          </button>
        </Link>
      </div>
    </div>
  );
}