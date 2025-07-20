import { PropertyCard } from './PropertyCard';
import { Home } from 'lucide-react';

export function FeaturedProperties({ properties }) {
  return (
    <div style={{
      padding: '4rem 0'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '9999px',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          padding: '0.75rem',
          marginBottom: '1rem'
        }}>
          <Home style={{ height: '1.5rem', width: '1.5rem', color: '#3b82f6' }} />
        </div>
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          marginBottom: '0.75rem'
        }}>Featured Properties</h2>
        <p style={{
          color: '#64748b',
          maxWidth: '42rem',
          margin: '0 auto'
        }}>
          Hand-selected premium properties currently available
        </p>
      </div>
      
      <div style={{
        display: 'grid',
        gap: '1.5rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
      }}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}