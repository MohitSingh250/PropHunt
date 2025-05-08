import { PropertyCard } from './PropertyCard';
import { mockData } from '../data/mockData';

export function FeaturedProperties() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {mockData.properties.slice(0, 2).map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}