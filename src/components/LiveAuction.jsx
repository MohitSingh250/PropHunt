import { AuctionCard } from './AuctionCard';
import { MockData } from '../data/MockData';
import { Gavel } from 'lucide-react';

export function LiveAuctions() {
  return (
    <div style={{
      backgroundColor: 'rgba(226, 232, 240, 0.3)',
      padding: '4rem 0'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '0 1rem'
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
            <Gavel style={{ height: '1.5rem', width: '1.5rem', color: '#3b82f6' }} />
          </div>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            marginBottom: '0.75rem'
          }}>Live Auctions</h2>
          <p style={{
            color: '#64748b',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Don't miss out on these exclusive opportunities
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
        }}>
          {MockData.auctions.map((auction) => {
            const property = MockData.properties.find((p) => p.id === auction.propertyId);
            return property && (
              <AuctionCard 
                key={auction.id} 
                auction={auction} 
                property={property} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}