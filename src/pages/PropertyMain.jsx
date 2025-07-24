import { PropertyCard } from '../components/PropertyCard';
import { MockData } from '../data/MockData';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const PropertyMain = () => {
  const properties = MockData.properties;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center rounded-full bg-blue-50 p-3 mb-4">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-3">All Properties</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Browse our complete collection of available properties
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyMain;