import { FeaturedProperties } from '../components/FeaturedProperties';
import { mockData } from '../data/mockData';
const PropertyMain = () => {
 const Properties = mockData.properties
  return (
     <section className="section ">
        <div className="container px-4 mx-auto">
        <FeaturedProperties properties={Properties} />
        </div>
      </section>
  );
};
export default PropertyMain;