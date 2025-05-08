import { useParams } from 'react-router-dom';
import { BidForm } from '../components/BidForm';
import { AuctionTimer } from '../components/AuctionTimer';
import { mockData } from '../data/mockData';

export function PropertyPage() {
  const { id } = useParams();
  const property = mockData.properties.find((p) => p.id === id);
  const auction = mockData.auctions.find((a) => a.propertyId === id);

  if (!property) return <div className="bg-black min-h-screen text-white container py-8">Property not found</div>;

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative h-96 rounded-lg overflow-hidden mb-4">
              <img
                src={property.images[0] || '/placeholder.jpg'}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold">{property.title}</h1>
            <p className="text-muted-foreground mb-4">{property.location}</p>
            <p className="text-xl font-semibold mb-4">${property.price.toLocaleString()}</p>
            {auction && (
              <div className="mb-4">
                <AuctionTimer endTime={auction.endTime} />
                <BidForm auction={auction} />
              </div>
            )}
            <div className="flex gap-6 mb-4 text-sm">
              <p>{property.bedrooms} Beds</p>
              <p>{property.bathrooms} Baths</p>
              <p>{property.squareFeet} sq ft</p>
            </div>
            <p className="mb-4">{property.description}</p>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="list-disc pl-5">
              {property.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="border p-4 rounded-lg bg-[#0F0F0F] text-white">
              <h3 className="font-semibold mb-2">{property.agent.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{property.agent.email}</p>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input placeholder="Your name" className="w-full rounded-md border p-2" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input type="email" placeholder="Your email" className="w-full rounded-md border p-2" />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea placeholder="I'm interested..." className="w-full rounded-md border p-2" />
                </div>
                <button className="w-full bg-primary text-white rounded-md py-2">Contact Agent</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
