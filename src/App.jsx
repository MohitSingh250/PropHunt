import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/Home';
import { SearchPage } from './pages/SearchPage';
import { PropertyPage } from './pages/PropertyPage';
import { AuctionPage } from './pages/AuctionPage';
import { Dashboard } from './pages/Dashboard';
import  PropertyMain  from './pages/PropertyMain';
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/properties/:id" element={<PropertyPage />} />
          <Route path="/properties" element={<PropertyMain />} />

          <Route path="/auctions" element={<AuctionPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}