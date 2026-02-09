import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPage } from '../api/wordpress';

export default function Page() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchPage(slug)
      .then(setPage)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading…</div>;
  if (error) return <div className="container" style={{ padding: '3rem', color: 'crimson' }}>Error: {error}</div>;
  if (!page) return <div className="container" style={{ padding: '3rem' }}>Page not found.</div>;

  return (
    <article className="container" style={{ padding: '2rem 0', maxWidth: '720px' }}>
      <Link to="/" style={{ marginBottom: '1rem', display: 'inline-block' }}>← Home</Link>
      <h1 style={{ marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{ __html: page.title?.rendered }} />
      <div
        className="page-content"
        style={{ lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: page.content?.rendered }}
      />
    </article>
  );
}
