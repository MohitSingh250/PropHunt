import { SearchBar } from '../components/SearchBar';
import { LiveAuctions } from '../components/LiveAuction';

export function AuctionsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-4 text-white">Live Auctions</h1>
        <div className="mb-8 max-w-md">
          <SearchBar />
        </div>
        <LiveAuctions />
      </div>
    </div>
  );
}