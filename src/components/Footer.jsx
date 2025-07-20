import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1e293b',
      color: 'white',
      padding: '3rem 1rem',
      borderTop: '1px solid #334155'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none'
          }}>
            PropHunt
          </Link>
          <p style={{ color: '#94a3b8' }}>
            The premier platform for property auctions and real estate investments.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <a href="#" style={{ color: '#94a3b8', transition: 'color 0.2s ease' }}>
              <Facebook style={{ height: '1.25rem', width: '1.25rem' }} />
            </a>
            <a href="#" style={{ color: '#94a3b8', transition: 'color 0.2s ease' }}>
              <Twitter style={{ height: '1.25rem', width: '1.25rem' }} />
            </a>
            <a href="#" style={{ color: '#94a3b8', transition: 'color 0.2s ease' }}>
              <Instagram style={{ height: '1.25rem', width: '1.25rem' }} />
            </a>
            <a href="#" style={{ color: '#94a3b8', transition: 'color 0.2s ease' }}>
              <Linkedin style={{ height: '1.25rem', width: '1.25rem' }} />
            </a>
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>Company</h3>
          <Link to="/about" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}>About Us</Link>
          <Link to="/careers" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}>Careers</Link>
          <Link to="/blog" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}>Blog</Link>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>Legal</h3>
          <Link to="/privacy" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}>Privacy Policy</Link>
          <Link to="/terms" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}>Terms of Service</Link>
          <Link to="/cookies" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}>Cookie Policy</Link>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>Contact</h3>
          <p style={{ color: '#94a3b8' }}>hello@prophunt.com</p>
          <p style={{ color: '#94a3b8' }}>+1 (555) 123-4567</p>
          <p style={{ color: '#94a3b8' }}>123 Estate Ave, New York</p>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid #334155',
        marginTop: '2rem',
        paddingTop: '2rem',
        textAlign: 'center',
        fontSize: '0.875rem',
        color: '#94a3b8'
      }}>
        ©️ {new Date().getFullYear()} PropHunt. All rights reserved.
      </div>
    </footer>
  );
}