import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Ruler } from 'lucide-react';

export function PropertyCard({ property }) {
  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '0.75rem',
      border: '1px solid #e2e8f0',
      backgroundColor: '#ffffff',
      color: '#020617',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease'
    }}>
      <Link 
        to={`/properties/${property.id}`}
        style={{
          display: 'block',
          position: 'relative',
          height: '12rem',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <img 
          src={property.images[0]} 
          alt={property.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          fontSize: '0.75rem',
          fontWeight: '500',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>
          ${property.price.toLocaleString()}
        </div>
      </Link>
      
      <div style={{ padding: '1rem' }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 'bold',
          marginBottom: '0.25rem'
        }}>{property.title}</h3>
        <p style={{
          color: '#64748b',
          fontSize: '0.875rem',
          marginBottom: '0.75rem'
        }}>{property.location}</p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: '#64748b'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Bed style={{ height: '0.75rem', width: '0.75rem' }} /> {property.bedrooms}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Bath style={{ height: '0.75rem', width: '0.75rem' }} /> {property.bathrooms}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Ruler style={{ height: '0.75rem', width: '0.75rem' }} /> {property.squareFeet} sq ft
          </span>
        </div>
      </div>
      
      <div style={{ 
        padding: '1rem',
        borderTop: '1px solid #e2e8f0'
      }}>
        <Link 
        to={`/properties/${property.id}`}>
        <button
         style={{
          width: '100%',
          backgroundColor: '#3b82f6',
          color: '#f8fafc',
          fontWeight: '500',
          borderRadius: '0.375rem',
          padding: '0.5rem 0',
          transition: 'background-color 0.2s ease'
        }}>
          View Details
        </button>
              </Link>

      </div>
    </div>
  );
}