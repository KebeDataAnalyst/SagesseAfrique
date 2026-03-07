import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ArticleCard from '../components/ArticleCard';
import { Database } from '../types/database';

type ArticleType = Database['public']['Tables']['articles']['Row'];

export default function History() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'history';
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, [category]);

  async function loadArticles() {
    setLoading(true);
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('category', category)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (data) {
      setArticles(data);
    }
    setLoading(false);
  }

  const categoryTitles: Record<string, { title: string; subtitle: string }> = {
    history: {
      title: "Histoire d'Afrique",
      subtitle: 'Empires, civilisations et événements historiques majeurs',
    },
    secrets: {
      title: "Secrets d'Afrique",
      subtitle: 'Mystères, traditions et trésors cachés du continent',
    },
    challenges: {
      title: "Défis de l'Afrique",
      subtitle: 'Innovation, développement et enjeux contemporains',
    },
  };

  const { title, subtitle } = categoryTitles[category] || categoryTitles.history;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>

      {loading ? (
        <p style={styles.loading}>Chargement...</p>
      ) : (
        <div style={styles.grid}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
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
    gap: '2rem',
  },
};
