import { SearchBar } from '../components/SearchBar';
import { LiveAuctions } from '../components/LiveAuction';
import { Gavel } from 'lucide-react';

export function AuctionPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      color: '#020617',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '4rem 1.5rem',
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
            padding: '1rem',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <Gavel style={{ 
              height: '2rem', 
              width: '2rem', 
              color: '#3b82f6',
              strokeWidth: '1.5px'
            }} />
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            lineHeight: '1.2',
            letterSpacing: '-0.025em',
            background: 'linear-gradient(to right, #1e40af, #3b82f6)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            maxWidth: '48rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Live Property Auctions
          </h1>
          <p style={{
            color: '#64748b',
            fontSize: '1.125rem',
            maxWidth: '42rem',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Bid on exclusive properties in real-time. Discover your dream home through our competitive auction platform.
          </p>
        </div>

        {/* Search Section */}
        <div style={{
          maxWidth: '40rem',
          margin: '0 auto 4rem auto',
          padding: '0 1rem',
          transition: 'all 0.3s ease'
        }}>
          <SearchBar />
        </div>

        {/* Auctions Section */}
        <div style={{
          borderRadius: '0.75rem',
          overflow: 'hidden',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.03), 0 4px 6px -2px rgba(0, 0, 0, 0.02)'
        }}>
          <LiveAuctions />
        </div>
      </div>

      {/* Global styles (you might want to move this to your CSS file) */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default AuctionPage;