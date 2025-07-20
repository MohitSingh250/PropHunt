import { PropertyCard } from './PropertyCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PropertyGrid({ properties }) {
  return (
    <div style={{
      animation: 'fadeIn 0.5s ease-out forwards'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600'
        }}>
          {properties.length} {properties.length === 1 ? 'Property' : 'Properties'} Found
        </h3>
        <div style={{
          fontSize: '0.875rem',
          color: '#64748b'
        }}>
          Sorted by: <span style={{ fontWeight: '500' }}>Newest</span>
        </div>
      </div>
      
      {properties.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem 0'
        }}>
          <h4 style={{
            fontSize: '1.125rem',
            fontWeight: '500',
            color: '#64748b',
            marginBottom: '0.5rem'
          }}>
            No properties match your criteria
          </h4>
          <p style={{
            fontSize: '0.875rem',
            color: '#64748b'
          }}>
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
          }}>
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div style={{
            textAlign: 'center',
            marginTop: '2.5rem'
          }}>
            <Link 
              to="/properties" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: '#3b82f6',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
            >
              View all properties <ArrowRight style={{ height: '1rem', width: '1rem', marginLeft: '0.25rem' }} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}