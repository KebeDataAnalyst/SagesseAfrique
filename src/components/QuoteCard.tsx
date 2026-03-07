import { Quote } from 'lucide-react';
import { Database } from '../types/database';

type QuoteType = Database['public']['Tables']['quotes']['Row'];

interface QuoteCardProps {
  quote: QuoteType;
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <div style={styles.card}>
      <Quote size={32} color="var(--primary)" style={styles.icon} />
      <div style={styles.content}>
        {quote.text_original && (
          <p style={styles.original}>{quote.text_original}</p>
        )}
        <p style={styles.text}>{quote.text}</p>
        {quote.translation && quote.text_original && (
          <p style={styles.translation}>{quote.translation}</p>
        )}
        {quote.author && (
          <p style={styles.author}>— {quote.author}</p>
        )}
        {quote.language && (
          <span style={styles.badge}>{quote.language}</span>
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
    padding: '1.5rem',
    display: 'flex',
    gap: '1rem',
    transition: 'box-shadow 0.2s',
    cursor: 'default',
  },
  icon: {
    flexShrink: 0,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  original: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    fontStyle: 'italic',
  },
  text: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: 'var(--text-primary)',
  },
  translation: {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
    fontStyle: 'italic',
  },
  author: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--primary)',
    marginTop: '0.5rem',
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
