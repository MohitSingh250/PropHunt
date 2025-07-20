import { SearchBar } from '../components/SearchBar';
import { LiveAuctions } from '../components/LiveAuction';
import { Gavel } from 'lucide-react';

export function AuctionPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      color: '#020617'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '3rem 1rem'
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
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            marginBottom: '0.75rem'
          }}>Live Property Auctions</h1>
          <p style={{
            color: '#64748b',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Bid on exclusive properties in real-time
          </p>
        </div>

        <div style={{
          maxWidth: '32rem',
          margin: '0 auto 3rem auto'
        }}>
          <SearchBar />
        </div>

        <LiveAuctions />
      </div>
    </div>
  );
}

export default AuctionPage;