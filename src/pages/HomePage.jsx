import { useState} from 'react';

export function HomePage() {
  const mockProperties = [
    {
      id: 1,
      name: "Luxury Villa in Beverly Hills",
      description: "A beautiful villa with stunning views and modern amenities.",
    },
    {
      id: 2,
      name: "Cozy Apartment in New York",
      description: "A cozy 2-bedroom apartment in the heart of Manhattan.",
    },
    {
      id: 3,
      name: "Beachfront Property in Miami",
      description: "A breathtaking beachfront property with easy access to the ocean.",
    },
  ];


  const [properties, setProperties] = useState(mockProperties);

  return (
    <div className="bg-gray-100 text-black">
      <header className="bg-blue-500 text-white text-center p-6">
        <h1 className="text-4xl">Find Your Dream Property</h1>
        <p className="mt-2">Explore and bid on the best properties.</p>
      </header>

      <section className="p-8">
        <h2 className="text-3xl text-center mb-4">Featured Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property.id} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">{property.name}</h3>
                <p>{property.description}</p>
              </div>
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
