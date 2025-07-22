import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/Home';
import { SearchPage } from './pages/SearchPage';
import { PropertyPage } from './pages/PropertyPage';
import { AuctionPage } from './pages/AuctionPage';
import { Dashboard } from './pages/Dashboard';
import PropertyMain from './pages/PropertyMain';
import Login from './pages/Login';
import { BidPage } from './pages/BidPage';
import { BidConfirmation } from './pages/BidConfirmation';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-160px)]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<Login />} />

          <Route path="/properties" element={<PropertyMain />} />
          <Route path="/properties/:id" element={<PropertyPage />} />
          <Route path="/properties/:id/bid" element={<BidPage />} />
          <Route
            path="/properties/:id/bid/confirmation"
            element={<BidConfirmation />}
          />

          <Route path="/auctions" element={<AuctionPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
