import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

import { PropertyCard } from '../components/PropertyCard';
import { AuctionCard } from '../components/AuctionCard';
import { mockData } from '../data/mockData';
import { Bookmark, Gavel, User, Bell, Settings } from 'lucide-react';

export function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const savedProperties = mockData.properties.slice(0, 3);
  const activeAuctions = mockData.auctions.slice(0, 2);

  useEffect(() => {
    // Fetch logged-in user
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        navigate('/login'); // redirect if no user
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!user) return null; // or add a loading spinner

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      color: '#020617'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {/* Sidebar */}
          <div style={{ width: '100%' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                height: '2.5rem',
                width: '2.5rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <User style={{ height: '1.25rem', width: '1.25rem', color: '#3b82f6' }} />
              </div>
              <div>
                <h3 style={{ fontWeight: '500' }}>{user.email}</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Premium Member</p>
              </div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <a href="#" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.75rem',
                backgroundColor: '#e2e8f0',
                borderRadius: '0.375rem',
                color: '#3b82f6',
                fontWeight: '500',
                textDecoration: 'none'
              }}>
                <Bookmark style={{ height: '1rem', width: '1rem' }} />
                Saved Properties
              </a>
              <a href="#" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.75rem',
                color: '#64748b',
                textDecoration: 'none'
              }}>
                <Gavel style={{ height: '1rem', width: '1rem' }} />
                My Bids
              </a>
              <a href="#" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.75rem',
                color: '#64748b',
                textDecoration: 'none'
              }}>
                <Bell style={{ height: '1rem', width: '1rem' }} />
                Notifications
              </a>
              <a href="#" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.75rem',
                color: '#64748b',
                textDecoration: 'none'
              }}>
                <Settings style={{ height: '1rem', width: '1rem' }} />
                Settings
              </a>
              <button onClick={handleLogout} style={{
                marginTop: '1rem',
                backgroundColor: '#ef4444',
                color: '#fff',
                padding: '0.5rem 0.75rem',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}>
                Logout
              </button>
            </nav>
          </div>

          {/* Main Content (same as your current layout) */}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Dashboard</h1>

            {/* Saved Properties */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Bookmark style={{ height: '1.25rem', width: '1.25rem', color: '#3b82f6' }} />
                  Saved Properties
                </h2>
                <a href="#" style={{
                  fontSize: '0.875rem',
                  color: '#3b82f6',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}>
                  View all
                </a>
              </div>
              <div style={{
                display: 'grid',
                gap: '1.5rem',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
              }}>
                {savedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>

            {/* Active Bids */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Gavel style={{ height: '1.25rem', width: '1.25rem', color: '#3b82f6' }} />
                  Active Bids
                </h2>
                <a href="#" style={{
                  fontSize: '0.875rem',
                  color: '#3b82f6',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}>
                  View all
                </a>
              </div>
              <div style={{
                display: 'grid',
                gap: '1.5rem',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
              }}>
                {activeAuctions.map((auction) => (
                  <AuctionCard
                    key={auction.id}
                    auction={auction}
                    property={mockData.properties.find((p) => p.id === auction.propertyId)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
