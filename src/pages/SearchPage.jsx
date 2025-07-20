import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PropertyFilter } from '../components/PropertyFilters';
import { PropertyGrid } from '../components/PropertyGrid';
import { mockData } from '../data/mockData';
import { Search } from 'lucide-react';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    location: '',
    type: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: ''
  });

  useEffect(() => {
    // Get search query from URL
    const query = searchParams.get('query') || '';
    const location = searchParams.get('location') || '';
    const type = searchParams.get('type') || 'all';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const bedrooms = searchParams.get('bedrooms') || '';

    setActiveFilters({
      location: location,
      type: type,
      minPrice: minPrice,
      maxPrice: maxPrice,
      bedrooms: bedrooms
    });

    // Filter properties based on search criteria
    const results = mockData.properties.filter(property => {
      const matchesSearch = query 
        ? property.title.toLowerCase().includes(query.toLowerCase()) || 
          property.location.toLowerCase().includes(query.toLowerCase()) ||
          property.description.toLowerCase().includes(query.toLowerCase())
        : true;
      
      const matchesLocation = location 
        ? property.location.toLowerCase().includes(location.toLowerCase()) 
        : true;
      
      const matchesType = type !== 'all' 
        ? property.type === type 
        : true;
      
      const matchesPrice = 
        (minPrice ? property.price >= Number(minPrice) : true) &&
        (maxPrice ? property.price <= Number(maxPrice) : true);
      
      const matchesBedrooms = bedrooms 
        ? property.bedrooms >= Number(bedrooms) 
        : true;

      return matchesSearch && matchesLocation && matchesType && matchesPrice && matchesBedrooms;
    });

    setFilteredProperties(results);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container px-4 py-12 sm:px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 mb-4">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            {filteredProperties.length} Properties Found
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {searchParams.get('query') 
              ? `Results for "${searchParams.get('query')}"` 
              : 'Browse our collection of premium properties'}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <PropertyFilter 
              activeFilters={activeFilters}
              onFilterChange={(newFilters) => {
                setActiveFilters(newFilters);
              }}
            />
          </div>
          <div className="lg:col-span-3">
            <PropertyGrid properties={filteredProperties} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchPage;