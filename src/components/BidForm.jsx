import { useState } from 'react';
import { mockData } from '../data/mockData';

export function BidForm({ auction }) {
  const [bidAmount, setBidAmount] = useState(auction.currentBid + auction.bidIncrement);

  const handleBid = (e) => {
    e.preventDefault();
    if (bidAmount <= auction.currentBid) return alert(`Bid must be at least $${auction.currentBid + auction.bidIncrement}`);
    auction.currentBid = bidAmount;
    mockData.notifications.push({
      id: `notif_${Date.now()}`,
      type: 'bid',
      message: `Bid of $${bidAmount} placed!`,
      createdAt: new Date().toISOString(),
    });
    alert('Bid placed!');
  };

  return (
    <form onSubmit={handleBid} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Bid Amount</label>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(Number(e.target.value))}
          min={auction.currentBid + auction.bidIncrement}
          className="w-full rounded-md border p-2"
        />
      </div>
      <button type="submit" className="w-full bg-primary text-white rounded-md py-2">
        Place Bid
      </button>
    </form>
  );
}
