import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api/wordpress';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts({ perPage: 5 })
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading…</div>;
  if (error) return <div className="container" style={{ padding: '3rem', color: 'crimson' }}>Error: {error}</div>;

  const list = Array.isArray(posts) ? posts : [];

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Latest Posts</h1>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {list.map((post) => (
          <li key={post.id} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
            <Link to={`/post/${post.slug}`} style={{ fontSize: '1.125rem', fontWeight: 600 }}>
              {post.title?.rendered}
            </Link>
            <div style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.875rem' }}>
              {new Date(post.date).toLocaleDateString()} · {post._embedded?.author?.[0]?.name || 'Author'}
            </div>
            {post.excerpt?.rendered && (
              <div
                style={{ marginTop: '0.5rem', color: '#444' }}
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
            )}
          </li>
        ))}
      </ul>
      <p style={{ marginTop: '2rem' }}>
        <Link to="/posts">View all posts →</Link>
      </p>
    </div>
  );
}
