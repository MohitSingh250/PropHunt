import { PropertyCard } from './PropertyCard';
import { Home } from 'lucide-react';

export function FeaturedProperties({ properties }) {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center rounded-full bg-blue-50 p-3 mb-4">
          <Home className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-3">Featured Properties</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Hand-selected premium properties currently available
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}