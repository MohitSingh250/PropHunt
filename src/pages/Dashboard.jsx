import { PropertyCard } from '../components/PropertyCard';
import { AuctionCard } from '../components/AuctionCard';
import { mockData } from '../data/mockData';
import { Bookmark, Gavel, User, Bell, Settings, Home, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard() {
  const savedProperties = mockData.properties.slice(0, 3);
  const activeAuctions = mockData.auctions.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-64 flex-shrink-0"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">John Doe</h3>
                  <p className="text-sm text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Premium Member</p>
                </div>
              </div>
            </div>

            <nav className="bg-white p-2 rounded-xl shadow-sm">
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-600 font-medium">
                <Bookmark className="h-5 w-5" />
                Saved Properties
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <Gavel className="h-5 w-5" />
                My Bids
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <Bell className="h-5 w-5" />
                Notifications
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <Settings className="h-5 w-5" />
                Settings
              </a>
            </nav>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-gray-900 mb-8"
            >
              Dashboard
            </motion.h1>

            {/* Saved Properties */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-blue-600" />
                  Saved Properties
                </h2>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  View all
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Active Bids */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Gavel className="h-5 w-5 text-blue-600" />
                  Active Bids
                </h2>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  View all
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeAuctions.map((auction, index) => (
                  <motion.div
                    key={auction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <AuctionCard
                      auction={auction}
                      property={mockData.properties.find((p) => p.id === auction.propertyId)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}