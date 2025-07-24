import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { MockData } from '../data/MockData';

export function PropertyFilter() {
  const navigate = useNavigate();
  const location = useLocation();
  const { locations, categories, propertyTypes, priceRanges } = MockData;

  const [filters, setFilters] = useState({
    location: '',
    propertyType: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    category: 'all'
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      location: params.get('location') || '',
      propertyType: params.get('propertyType') || 'all',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || '',
      bedrooms: params.get('bedrooms') || '',
      category: params.get('category') || 'all'
    });
  }, [location.search]);

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') params.append(key, value);
    });
    navigate(`/search?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      propertyType: 'all',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      category: 'all'
    });
    navigate('/search');
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="flex items-center gap-2 font-medium">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </h3>
        <button onClick={resetFilters} className="text-sm text-slate-500 hover:text-slate-700">
          Reset all
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="w-full rounded-lg border border-slate-200 p-2 text-sm"
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc.id} value={loc.name}>{loc.name} ({loc.count})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full rounded-lg border border-slate-200 p-2 text-sm"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name} ({cat.count})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Property Type</label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
            className="w-full rounded-lg border border-slate-200 p-2 text-sm"
          >
            <option value="all">All Types</option>
            {propertyTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name} ({type.count})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Price Range</label>
          <select
            name="priceRange"
            value={`${filters.minPrice}-${filters.maxPrice}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-');
              setFilters(prev => ({ ...prev, minPrice: min || '', maxPrice: max || '' }));
            }}
            className="w-full rounded-lg border border-slate-200 p-2 text-sm"
          >
            <option value="-">Any Price</option>
            {priceRanges.map(range => (
              <option key={range.id} value={`${range.min}-${range.max}`}>
                {range.label} ({range.count})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Bedrooms</label>
          <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            className="w-full rounded-lg border border-slate-200 p-2 text-sm"
          >
            <option value="">Any</option>
            {[...Array(5)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}+</option>
            ))}
            <option value="6">6+</option>
          </select>
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg py-2.5 px-4 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
      >
        Apply Filters
      </button>
    </div>
  );
}