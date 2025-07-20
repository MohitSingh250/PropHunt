import { Link } from 'react-router-dom';
import { AuctionTimer } from './AuctionTimer';
import { Gavel, MapPin, Bed, Bath, Ruler } from 'lucide-react';

export function AuctionCard({ auction, property }) {
  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '0.75rem',
      border: '1px solid #e2e8f0',
      backgroundColor: '#ffffff',
      color: '#020617',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}>
      <Link 
        to={`/properties/${property.id}`} 
        style={{
          display: 'block',
          position: 'relative',
          height: '15rem',
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
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
        }} />
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          zIndex: 10,
          backgroundColor: '#ef4444',
          color: 'white',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          padding: '0.25rem 0.5rem',
          borderRadius: '9999px',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}>
          LIVE
        </div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          padding: '1rem',
          width: '100%'
        }}>
          <h3 style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.125rem',
            lineHeight: '1.75rem'
          }}>{property.title}</h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: '#d1d5db',
            fontSize: '0.875rem'
          }}>
            <MapPin style={{ height: '0.75rem', width: '0.75rem', marginRight: '0.25rem' }} />
            <span>{property.location}</span>
          </div>
        </div>
      </Link>
      
      <div style={{ padding: '1rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem'
        }}>
          <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Current Bid</span>
          <span style={{ color: '#020617', fontWeight: 'bold' }}>${auction.currentBid.toLocaleString()}</span>
        </div>
        
        <AuctionTimer endTime={auction.endTime} />
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem',
          fontSize: '0.875rem',
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
        <button style={{
          width: '100%',
          backgroundColor: '#3b82f6',
          color: '#f8fafc',
          fontWeight: '500',
          borderRadius: '0.375rem',
          padding: '0.5rem 0',
          transition: 'background-color 0.2s ease'
        }}>
          Place Bid
        </button>
      </div>
    </div>
  );
}