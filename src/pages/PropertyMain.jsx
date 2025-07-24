import { FeaturedProperties } from '../components/FeaturedProperties';
import { mockData } from '../data/mockData.js';
import { motion } from 'framer-motion';

const PropertyMain = () => {
  const Properties = mockData.properties;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <FeaturedProperties properties={Properties} />
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyMain;