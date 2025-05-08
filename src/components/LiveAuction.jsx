import { AuctionCard } from './AuctionCard';
import { mockData } from '../data/mockData';

export function LiveAuctions() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {mockData.auctions.map((a) => {
        const p = mockData.properties.find((p) => p.id === a.propertyId);
        return p && <AuctionCard key={a.id} auction={a} property={p} />;
      })}
    </div>
  );
}