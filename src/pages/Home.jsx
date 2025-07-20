import { SearchBar } from '../components/SearchBar';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { LiveAuctions } from '../components/LiveAuction';
import { ArrowRight, Home, Gavel } from 'lucide-react';
import { mockData } from '../data/mockData';
import { Link } from 'react-router-dom';

export function HomePage() {
  const featuredProperties = mockData.properties.slice(0, 6);
  const liveAuctions = mockData.auctions.slice(0, 4);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        </div>
        
        <div className="container relative z-10 px-4 text-center">
          <h1 className="heading-1 mb-6 animate-in" style={{ animationDelay: '0.1s' }}>
            Discover <span className="text-primary">Exceptional</span> Properties
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-in" style={{ animationDelay: '0.2s' }}>
            Premium real estate auctions featuring luxury homes, commercial properties, and unique investments
          </p>
          <div className="max-w-md mx-auto animate-in" style={{ animationDelay: '0.3s' }}>
            <SearchBar />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-8 w-5 rounded-full border-2 border-foreground flex justify-center">
            <div className="h-1 w-1 bg-foreground rounded-full mt-1"></div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4 mx-auto">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <h2 className="heading-2 mb-3">Featured Properties</h2>
            <p className="section-description">
              Hand-selected premium properties currently available
            </p>
          </div>
          <FeaturedProperties properties={featuredProperties} />
          <div className="text-center mt-10">
            <Link 
              to="/properties" 
              className="inline-flex items-center text-primary font-medium hover:text-primary/90 transition-colors"
            >
              View all properties <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Live Auctions */}
      <section className="section bg-secondary/30">
        <div className="container px-4 mx-auto" >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4 mx-auto">
              <Gavel className="h-6 w-6 text-primary" />
            </div>
            <h2 className="heading-2 mb-3">Live Auctions</h2>
            <p className="section-description">
              Don't miss your chance to own these exclusive properties
            </p>
          </div>
          <LiveAuctions auctions={liveAuctions} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="heading-2 mb-4">Ready to Find Your Dream Property?</h2>
          <p className="text-primary-foreground/80 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied buyers in our premium real estate marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/properties" 
              className="btn-primary bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Browse Properties
            </Link>
            <Link 
              to="/auctions" 
              className="btn-secondary border border-primary-foreground hover:bg-primary-foreground/10"
            >
              View Auctions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
export default HomePage;