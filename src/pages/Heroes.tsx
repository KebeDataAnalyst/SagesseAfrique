import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import HeroCard from '../components/HeroCard';
import { Database } from '../types/database';

type HeroType = Database['public']['Tables']['heroes']['Row'];

export default function Heroes() {
  const [heroes, setHeroes] = useState<HeroType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHeroes();
  }, []);

  async function loadHeroes() {
    setLoading(true);
    const { data } = await supabase
      .from('heroes')
      .select('*')
      .order('is_featured', { ascending: false })
      .order('name', { ascending: true });

    if (data) {
      setHeroes(data);
    }
    setLoading(false);
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Héros Africains</h1>
        <p style={styles.subtitle}>
          Découvrez les grandes figures qui ont marqué l'histoire de l'Afrique
        </p>
      </div>

      {loading ? (
        <p style={styles.loading}>Chargement...</p>
      ) : (
        <div style={styles.grid}>
          {heroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2rem',
  },
};
