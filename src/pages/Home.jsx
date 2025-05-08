import { SearchBar } from '../components/SearchBar';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { LiveAuctions } from '../components/LiveAuction';

export function Home() {

    return (
      <div className="bg-[#0A0A0A] text-white">
        <section
          className="relative bg-cover bg-center h-screen flex items-center justify-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1734209507417-1f70aa230aa7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="container relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Dream Property</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
              Discover and bid on exclusive properties in premier locations
            </p>
            <div className="max-w-md mx-auto">
              <SearchBar />
            </div>
          </div>
        </section>
  
        <section className="container min-w-full py-16 px-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>
          <FeaturedProperties />
        </section>
  
        <section className="bg-[#0A0A0A] min-w-full py-16 px-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Live Auctions</h2>
            <LiveAuctions />
          </div>
        </section>
      </div>
    );
  }
  