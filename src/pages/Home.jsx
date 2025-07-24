import { SearchBar } from '../components/SearchBar';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { LiveAuctions } from '../components/LiveAuction';
import { ArrowRight, Home, Gavel } from 'lucide-react';
import { MockData } from '../data/mockdata';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function HomePage() {
  const featuredProperties = MockData.properties.slice(0, 6);
  const liveAuctions = MockData.auctions.slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80')] bg-cover bg-center bg-fixed">
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/30"></div>
  </div>
  
  <div className="container relative z-10 px-4 text-center">
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
    >
      Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Exceptional</span> Properties
    </motion.h1>
    
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light"
    >
      Premium real estate auctions featuring luxury homes, commercial properties, and unique investment opportunities worldwide
    </motion.p>
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="max-w-2xl mx-auto"
    >
      <SearchBar />
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex justify-center gap-4 mt-12"
    >
      <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1">
        View Auctions
      </button>
      
    </motion.div>
  </div>

  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
  >
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-300 mb-2">Scroll Down</span>
      <div className="h-10 w-6 rounded-3xl border-2 border-blue-400 flex justify-center relative">
        <motion.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="h-2 w-1 bg-blue-400 rounded-full absolute top-2"
        ></motion.div>
      </div>
    </div>
  </motion.div>

  {/* Floating stats */}
  <div className="absolute bottom-10 right-10 hidden lg:block">
    <div className="grid grid-cols-3 gap-4 text-white">
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center border border-white/10">
        <div className="text-2xl font-bold text-blue-400">10K+</div>
        <div className="text-xs uppercase tracking-wider">Properties</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center border border-white/10">
        <div className="text-2xl font-bold text-blue-400">95%</div>
        <div className="text-xs uppercase tracking-wider">Success Rate</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center border border-white/10">
        <div className="text-2xl font-bold text-blue-400">$5B+</div>
        <div className="text-xs uppercase tracking-wider">Transactions</div>
      </div>
    </div>
  </div>
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