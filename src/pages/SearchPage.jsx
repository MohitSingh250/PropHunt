import { PropertyFilters } from '../components/PropertyFilters';
import { PropertyGrid } from '../components/PropertyGrid';
import { mockData } from '../data/mockData';

export function SearchPage() {
  const properties = mockData.properties;

  return (
    <div className="p-4 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <PropertyFilters />
      <PropertyGrid properties={properties} />
    </div>
  );
}
