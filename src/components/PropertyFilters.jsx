import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';

export function PropertyFilter({ locations = [], categories = [] }) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: '',
    type: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: ''
  });

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
      type: 'all',
      minPrice: '',
      maxPrice: '',
      bedrooms: ''
    });
    navigate('/search');
  };

  return (
    <div style={{
      borderRadius: '0.75rem',
      border: '1px solid #e2e8f0',
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <SlidersHorizontal style={{ height: '1rem', width: '1rem' }} />
          Filters
        </h3>
        <button 
          onClick={resetFilters}
          style={{
            fontSize: '0.875rem',
            color: '#64748b',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Reset all
        </button>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {/* Location Filter */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '0.5rem'
          }}>Location</label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            style={{
              width: '100%',
              borderRadius: '0.375rem',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem'
            }}
          >
            <option value="">All Locations</option>
            {Array.isArray(locations) && locations.map(location => (
              <option key={location.id} value={location.city}>
                {location.city}, {location.state} ({location.count})
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '0.5rem'
          }}>Property Type</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
            style={{
              width: '100%',
              borderRadius: '0.375rem',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem'
            }}
          >
            <option value="all">All Types</option>
            {Array.isArray(categories) && categories.map(category => (
              <option key={category.id} value={category.name.toLowerCase()}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>Min Price</label>
            <input
              type="number"
              placeholder="$ Min"
              value={filters.minPrice}
              onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              style={{
                width: '100%',
                borderRadius: '0.375rem',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>Max Price</label>
            <input
              type="number"
              placeholder="$ Max"
              value={filters.maxPrice}
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              style={{
                width: '100%',
                borderRadius: '0.375rem',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
        </div>

        {/* Bedrooms Filter */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '0.5rem'
          }}>Bedrooms</label>
          <select
            value={filters.bedrooms}
            onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
            style={{
              width: '100%',
              borderRadius: '0.375rem',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem'
            }}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
      </div>

      <button
        onClick={applyFilters}
        style={{
          width: '100%',
          marginTop: '1rem',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          transition: 'all 0.15s ease',
          backgroundColor: '#3b82f6',
          color: '#f8fafc',
          padding: '0.625rem 1rem',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Apply Filters
      </button>
    </div>
  );
}

export default PropertyFilter;