import { Link } from 'react-router-dom';

export function PropertyCard({ property }) {
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
          <div className="absolute top-2 right-2 bg-[#0F0F0F]/70 px-2 py-1 rounded text-sm">
            ${property.price.toLocaleString()}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{property.title}</h3>
          <p className="text-gray-300 text-sm mb-3">{property.location}</p>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>{property.bedrooms} Beds</span>
            <span>{property.bathrooms} Baths</span>
            <span>{property.squareFeet} sq ft</span>
          </div>
        </div>
        <div className="p-4 border-t border-gray-700">
          <button className="w-full bg-white text-gray-900 font-medium rounded-md py-2 hover:bg-gray-100 transition-colors">
            View Details
          </button>
        </div>
      </Link>
    );
  }