import { useState } from 'react';
import { Gavel } from 'lucide-react';

export function BidForm({ auction }) {
  const [bidAmount, setBidAmount] = useState(auction.currentBid + auction.bidIncrement);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBid = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <form 
      onSubmit={handleBid} 
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.5rem',
        backgroundColor: '#ffffff',
        borderRadius: '0.75rem',
        border: '1px solid #e2e8f0'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Current Bid</label>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          ${auction.currentBid.toLocaleString()}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label 
          htmlFor="bidAmount"
          style={{ fontSize: '0.875rem', fontWeight: '500' }}
        >
          Your Bid Amount
        </label>
        <input
          id="bidAmount"
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(Number(e.target.value))}
          min={auction.currentBid + auction.bidIncrement}
          step={auction.bidIncrement}
          style={{
            width: '100%',
            borderRadius: '0.375rem',
            border: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            padding: '0.5rem 0.75rem',
            fontSize: '0.875rem'
          }}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          transition: 'colors 0.15s ease',
          backgroundColor: '#3b82f6',
          color: '#f8fafc',
          padding: '0.625rem 1rem',
          opacity: isSubmitting ? 0.5 : 1,
          cursor: isSubmitting ? 'not-allowed' : 'pointer'
        }}
      >
        {isSubmitting ? (
          <>
            <svg 
              style={{ 
                animation: 'spin 1s linear infinite',
                marginRight: '0.5rem',
                height: '1rem',
                width: '1rem'
              }} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            <Gavel style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
            Place Bid
          </>
        )}
      </button>
    </form>
  );
}

export default BidForm;