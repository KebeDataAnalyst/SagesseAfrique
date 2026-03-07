import { Database } from '../types/database';

type ArticleType = Database['public']['Tables']['articles']['Row'];

interface ArticleCardProps {
  article: ArticleType;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div style={styles.card}>
      {article.image_url && (
        <div style={styles.imageWrapper}>
          <img src={article.image_url} alt={article.title} style={styles.image} />
        </div>
      )}
      <div style={styles.content}>
        <div style={styles.header}>
          <span style={styles.badge}>{article.category}</span>
          {article.is_featured && (
            <span style={styles.featured}>En vedette</span>
          )}
        </div>
        <h3 style={styles.title}>{article.title}</h3>
        <p style={styles.summary}>{article.summary}</p>
        <p style={styles.text}>{article.content}</p>
        {article.views > 0 && (
          <p style={styles.views}>{article.views} vues</p>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: 'var(--background)',
    border: '1px solid var(--border)',
    borderRadius: '1rem',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s',
  },
  imageWrapper: {
    width: '100%',
    height: '200px',
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
  header: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: 500,
    borderRadius: '9999px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    textTransform: 'capitalize',
  },
  featured: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: 500,
    borderRadius: '9999px',
    backgroundColor: 'var(--secondary)',
    color: 'white',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '0.75rem',
  },
  summary: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '0.75rem',
  },
  text: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: 'var(--text-primary)',
  },
  views: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    marginTop: '1rem',
  },
};
