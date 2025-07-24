import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PropertyFilter } from '../components/PropertyFilters';
import { PropertyGrid } from '../components/PropertyGrid';
import {MockData} from '../data/mockdata'
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

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
    const query = searchParams.get('query') || '';
    const location = searchParams.get('location') || '';
    const type = searchParams.get('type') || 'all';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const bedrooms = searchParams.get('bedrooms') || '';

    setActiveFilters({
      location,
      type,
      minPrice,
      maxPrice,
      bedrooms
    });

    const results = MockData.properties.filter(property => {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-blue-100 p-4 mb-4">
            <Search className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {searchParams.get('query') 
              ? `Results for "${searchParams.get('query')}"` 
              : 'Browse our collection of premium properties'}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <PropertyFilter 
              activeFilters={activeFilters}
              onFilterChange={(newFilters) => {
                setActiveFilters(newFilters);
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
            className="lg:col-span-3"
          >
            <PropertyGrid properties={filteredProperties} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;