import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Quote, Users, Landmark, BookOpen, Eye, Smile, Target, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import QuoteCard from '../components/QuoteCard';
import { Database } from '../types/database';

type QuoteType = Database['public']['Tables']['quotes']['Row'];

const categories = [
  { icon: Quote, name: 'Citations', path: '/quotes', color: '#d97706' },
  { icon: MessageSquare, name: 'Citations Sénégalaises', path: '/quotes?category=senegalese', color: '#0891b2' },
  { icon: Users, name: 'Héros Africains', path: '/heroes', color: '#dc2626' },
  { icon: Landmark, name: "Histoire d'Afrique", path: '/history', color: '#059669' },
  { icon: BookOpen, name: 'Auteurs', path: '/more?tab=authors', color: '#7c3aed' },
  { icon: Eye, name: "Secrets d'Afrique", path: '/history?category=secrets', color: '#db2777' },
  { icon: Smile, name: 'Blagues', path: '/more?tab=jokes', color: '#f59e0b' },
  { icon: Target, name: "Défis de l'Afrique", path: '/history?category=challenges', color: '#2563eb' },
];

export default function Home() {
  const [featuredQuotes, setFeaturedQuotes] = useState<QuoteType[]>([]);

  useEffect(() => {
    loadFeaturedQuotes();
  }, []);

  async function loadFeaturedQuotes() {
    const { data } = await supabase
      .from('quotes')
      .select('*')
      .eq('is_featured', true)
      .limit(3);

    if (data) {
      setFeaturedQuotes(data);
    }
  }

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle} className="hero-title">Sagesse d'Afrique Internationale</h1>
        <p style={styles.heroSubtitle} className="hero-subtitle">
          Découvrez la richesse culturelle, historique et intellectuelle de l'Afrique.
        </p>
      </section>

      <section style={styles.categories}>
        <h2 style={styles.sectionTitle} className="section-title">Explorer</h2>
        <div style={styles.categoryGrid} className="category-grid">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.path}
                to={category.path}
                style={{
                  ...styles.categoryCard,
                  borderTop: `4px solid ${category.color}`,
                }}
              >
                <Icon size={32} color={category.color} />
                <span style={styles.categoryName}>{category.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {featuredQuotes.length > 0 && (
        <section style={styles.featured}>
          <h2 style={styles.sectionTitle}>Citations en vedette</h2>
          <div style={styles.quoteGrid}>
            {featuredQuotes.map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '1rem',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '2rem',
    padding: '2rem 1rem',
    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    borderRadius: '1rem',
    color: 'white',
  },
  heroTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '1rem',
    lineHeight: 1.2,
  },
  heroSubtitle: {
    fontSize: '0.95rem',
    opacity: 0.95,
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: 1.5,
  },
  categories: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
    color: 'var(--text-primary)',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '1rem',
  },
  categoryCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1.5rem 1rem',
    background: 'var(--background)',
    border: '1px solid var(--border)',
    borderRadius: '1rem',
    transition: 'all 0.2s',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  categoryName: {
    fontSize: '0.875rem',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 1.3,
  },
  featured: {
    marginBottom: '2rem',
  },
  quoteGrid: {
    display: 'grid',
    gap: '1rem',
  },
};
