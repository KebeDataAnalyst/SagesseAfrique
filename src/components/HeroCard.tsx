import { Database } from '../types/database';

type HeroType = Database['public']['Tables']['heroes']['Row'];

interface HeroCardProps {
  hero: HeroType;
}

export default function HeroCard({ hero }: HeroCardProps) {
  return (
    <div style={styles.card}>
      {hero.image_url && (
        <div style={styles.imageWrapper}>
          <img src={hero.image_url} alt={hero.name} style={styles.image} />
        </div>
      )}
      <div style={styles.content}>
        <h3 style={styles.name}>{hero.name}</h3>
        {hero.birth_date && (
          <p style={styles.dates}>
            {hero.birth_date} {hero.death_date && `- ${hero.death_date}`}
          </p>
        )}
        <p style={styles.bio}>{hero.bio}</p>
        {hero.famous_quotes && (
          <blockquote style={styles.quote}>
            "{hero.famous_quotes}"
          </blockquote>
        )}
        {hero.achievements && (
          <div style={styles.achievements}>
            <p style={styles.achievementsTitle}>Réalisations:</p>
            <p style={styles.achievementsText}>{hero.achievements}</p>
          </div>
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
  quote: {
    fontSize: '0.875rem',
    fontStyle: 'italic',
    color: 'var(--primary)',
    borderLeft: '3px solid var(--primary)',
    paddingLeft: '1rem',
    marginBottom: '1rem',
  },
  achievements: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: 'var(--surface)',
    borderRadius: '0.5rem',
  },
  achievementsTitle: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '0.5rem',
  },
  achievementsText: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    color: 'var(--text-secondary)',
  },
};
