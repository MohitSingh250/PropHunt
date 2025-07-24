import { SearchBar } from '../components/SearchBar';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { LiveAuctions } from '../components/LiveAuction';
import { ArrowRight, Home, Gavel } from 'lucide-react';
import { mockData } from '../data/mockData';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function HomePage() {
  const featuredProperties = mockData.properties.slice(0, 6);
  const liveAuctions = mockData.auctions.slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent"></div>
        </div>
        
        <div className="container relative z-10 px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Discover <span className="text-blue-600">Exceptional</span> Properties
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Premium real estate auctions featuring luxury homes, commercial properties, and unique investments
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <SearchBar />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <div className="h-8 w-5 rounded-full border-2 border-gray-900 flex justify-center">
            <div className="h-1 w-1 bg-gray-900 rounded-full mt-1"></div>
          </div>
        </motion.div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
         
          
          <FeaturedProperties properties={featuredProperties} />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link 
              to="/properties" 
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              View all properties <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Live Auctions */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          {/*  */}
          
          <LiveAuctions auctions={liveAuctions} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container text-center px-4 mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Ready to Find Your Dream Property?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of satisfied buyers in our premium real estate marketplace
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/properties" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Properties
            </Link>
            <Link 
              to="/auctions" 
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              View Auctions
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}