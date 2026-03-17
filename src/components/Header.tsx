import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Accueil', path: '/' },
  { name: 'Citations', path: '/quotes' },
  { name: 'Héros', path: '/heroes' },
  { name: 'Histoire', path: '/history' },
  { name: 'Plus', path: '/more' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.content}>
          <Link to="/" style={styles.logo}>
            <img
              src="/logo_afri.jpeg"
              alt="Sagesse d'Afrique"
              style={styles.logoImage}
            />
            <span style={styles.logoText}>Sagesse d'Afrique</span>
          </Link>

          <nav style={styles.desktopNav}>
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...styles.navLink,
                  ...(location.pathname === item.path ? styles.navLinkActive : {}),
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            style={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav style={styles.mobileNav}>
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...styles.mobileNavLink,
                  ...(location.pathname === item.path ? styles.mobileNavLinkActive : {}),
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    background: 'var(--background)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
  },
  logoImage: {
    height: '50px',
    width: 'auto',
    borderRadius: '6px',
    objectFit: 'contain',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'var(--primary)',
  },
  desktopNav: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    transition: 'color 0.2s',
  },
  navLinkActive: {
    color: 'var(--primary)',
  },
  mobileMenuButton: {
    display: 'block',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    padding: '0.5rem',
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    paddingBottom: '1rem',
  },
  mobileNavLink: {
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    borderRadius: '0.5rem',
    transition: 'background-color 0.2s',
  },
  mobileNavLinkActive: {
    backgroundColor: 'var(--surface)',
    color: 'var(--primary)',
  },
};
