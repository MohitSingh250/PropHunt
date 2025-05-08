import { PropertyCard } from './PropertyCard';

export function PropertyGrid({ properties }) {
  return (
    <div>
      <p className="mb-4">{properties.length} properties</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}