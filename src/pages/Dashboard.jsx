import { PropertyCard } from '../components/PropertyCard';
import { AuctionCard } from '../components/AuctionCard';
import { mockData } from '../data/mockData';

export function Dashboard() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Saved Properties</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {mockData.properties.slice(0, 2).map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
            <h2 className="text-xl font-semibold mt-8 mb-4">Active Bids</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {mockData.auctions.map((a) => (
                <AuctionCard
                  key={a.id}
                  auction={a}
                  property={mockData.properties.find((p) => p.id === a.propertyId)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
