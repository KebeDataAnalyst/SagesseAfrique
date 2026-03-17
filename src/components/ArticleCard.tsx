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
    borderRadius: '0.75rem',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s',
  },
  imageWrapper: {
    width: '100%',
    height: '180px',
    overflow: 'hidden',
    backgroundColor: 'var(--surface)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    padding: '1rem',
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '0.75rem',
  },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.65rem',
    fontSize: '0.7rem',
    fontWeight: 500,
    borderRadius: '9999px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    textTransform: 'capitalize',
  },
  featured: {
    display: 'inline-block',
    padding: '0.25rem 0.65rem',
    fontSize: '0.7rem',
    fontWeight: 500,
    borderRadius: '9999px',
    backgroundColor: 'var(--secondary)',
    color: 'white',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '0.5rem',
    lineHeight: 1.3,
  },
  summary: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '0.5rem',
    lineHeight: 1.4,
  },
  text: {
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: 'var(--text-primary)',
  },
  views: {
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
    marginTop: '0.75rem',
  },
};
