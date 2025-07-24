import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Ruler } from 'lucide-react';

export function PropertyCard({ property }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <Link to={`/properties/${property.id}`} className="block relative h-48 w-full overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-slate-900/80 text-white px-2 py-1 rounded text-xs font-medium">
          ${property.price.toLocaleString()}
        </div>
      </Link>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-800 mb-1">{property.title}</h3>
        <p className="text-slate-500 text-sm mb-3">{property.location}</p>
        
        <div className="flex justify-between text-xs text-slate-500">
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
        <Link to={`/properties/${property.id}`}>
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg py-2 px-4 hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}