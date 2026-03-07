export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>
          Sagesse d'Afrique Internationale - {new Date().getFullYear()}
        </p>
        <p style={styles.subtitle}>
          Découvrir la richesse culturelle et historique de l'Afrique
        </p>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    background: 'var(--surface)',
    borderTop: '1px solid var(--border)',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem 1rem',
    textAlign: 'center',
  },
  text: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  },
};
