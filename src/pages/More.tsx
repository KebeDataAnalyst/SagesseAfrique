import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type AuthorType = Database['public']['Tables']['authors']['Row'];
type JokeType = Database['public']['Tables']['jokes']['Row'];

export default function More() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'authors';
  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [jokes, setJokes] = useState<JokeType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, [tab]);

  async function loadContent() {
    setLoading(true);
    if (tab === 'authors') {
      const { data } = await supabase
        .from('authors')
        .select('*')
        .order('name', { ascending: true });
      if (data) setAuthors(data);
    } else {
      const { data } = await supabase
        .from('jokes')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setJokes(data);
    }
    setLoading(false);
  }

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(tab === 'authors' ? styles.tabActive : {}),
          }}
          onClick={() => setSearchParams({ tab: 'authors' })}
        >
          Auteurs Sénégalais
        </button>
        <button
          style={{
            ...styles.tab,
            ...(tab === 'jokes' ? styles.tabActive : {}),
          }}
          onClick={() => setSearchParams({ tab: 'jokes' })}
        >
          Blagues Africaines
        </button>
      </div>

      {loading ? (
        <p style={styles.loading}>Chargement...</p>
      ) : tab === 'authors' ? (
        <div style={styles.grid}>
          {authors.map((author) => (
            <div key={author.id} style={styles.authorCard}>
              {author.image_url && (
                <div style={styles.imageWrapper}>
                  <img src={author.image_url} alt={author.name} style={styles.image} />
                </div>
              )}
              <div style={styles.content}>
                <h3 style={styles.name}>{author.name}</h3>
                {author.birth_date && (
                  <p style={styles.dates}>
                    {author.birth_date} {author.death_date && `- ${author.death_date}`}
                  </p>
                )}
                <p style={styles.bio}>{author.bio}</p>
                {author.works && (
                  <div style={styles.works}>
                    <p style={styles.worksTitle}>Œuvres:</p>
                    <p style={styles.worksText}>{author.works}</p>
                  </div>
                )}
                {author.famous_quotes && (
                  <blockquote style={styles.quote}>"{author.famous_quotes}"</blockquote>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.jokeGrid}>
          {jokes.map((joke) => (
            <div key={joke.id} style={styles.jokeCard}>
              <p style={styles.jokeText}>{joke.text}</p>
              {joke.category && <span style={styles.badge}>{joke.category}</span>}
            </div>
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
  tabs: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    borderBottom: '2px solid var(--border)',
  },
  tab: {
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: 600,
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    borderBottom: '2px solid transparent',
    marginBottom: '-2px',
    transition: 'all 0.2s',
  },
  tabActive: {
    color: 'var(--primary)',
    borderBottomColor: 'var(--primary)',
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
  authorCard: {
    background: 'var(--background)',
    border: '1px solid var(--border)',
    borderRadius: '1rem',
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    backgroundColor: 'var(--surface)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    padding: '1.5rem',
  },
  name: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '0.5rem',
  },
  dates: {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
    marginBottom: '1rem',
  },
  bio: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: 'var(--text-primary)',
    marginBottom: '1rem',
  },
  works: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: 'var(--surface)',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
  },
  worksTitle: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '0.5rem',
  },
  worksText: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    color: 'var(--text-secondary)',
  },
  quote: {
    fontSize: '0.875rem',
    fontStyle: 'italic',
    color: 'var(--primary)',
    borderLeft: '3px solid var(--primary)',
    paddingLeft: '1rem',
  },
  jokeGrid: {
    display: 'grid',
    gap: '1.5rem',
  },
  jokeCard: {
    background: 'var(--background)',
    border: '1px solid var(--border)',
    borderRadius: '1rem',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  jokeText: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: 'var(--text-primary)',
  },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: 500,
    borderRadius: '9999px',
    backgroundColor: 'var(--surface)',
    color: 'var(--text-secondary)',
    textTransform: 'capitalize',
    alignSelf: 'flex-start',
  },
};
