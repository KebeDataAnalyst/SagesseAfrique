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
    borderRadius: '0.75rem',
    padding: '1rem',
    display: 'flex',
    gap: '0.75rem',
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
    gap: '0.65rem',
  },
  original: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    fontStyle: 'italic',
    lineHeight: 1.5,
  },
  text: {
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: 'var(--text-primary)',
  },
  translation: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontStyle: 'italic',
    lineHeight: 1.5,
  },
  author: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--primary)',
    marginTop: '0.25rem',
  },
  badge: {
    display: 'inline-block',
    padding: '0.2rem 0.65rem',
    fontSize: '0.7rem',
    fontWeight: 500,
    borderRadius: '9999px',
    backgroundColor: 'var(--surface)',
    color: 'var(--text-secondary)',
    textTransform: 'capitalize',
    alignSelf: 'flex-start',
  },
};
