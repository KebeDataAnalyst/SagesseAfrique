import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import QuoteCard from '../components/QuoteCard';
import { Database } from '../types/database';

type QuoteType = Database['public']['Tables']['quotes']['Row'];

export default function Quotes() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'african';
  const [quotes, setQuotes] = useState<QuoteType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuotes();
  }, [category]);

  async function loadQuotes() {
    setLoading(true);
    const { data } = await supabase
      .from('quotes')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (data) {
      setQuotes(data);
    }
    setLoading(false);
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          {category === 'senegalese' ? 'Citations Sénégalaises' : 'Citations Africaines'}
        </h1>
        <p style={styles.subtitle}>
          {category === 'senegalese'
            ? 'Proverbes en wolof, pulaar et sérère'
            : "Sagesse et inspiration du continent africain"}
        </p>
      </div>

      {loading ? (
        <p style={styles.loading}>Chargement...</p>
      ) : (
        <div style={styles.grid}>
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    padding: '3rem',
  },
  grid: {
    display: 'grid',
    gap: '1.5rem',
  },
};
