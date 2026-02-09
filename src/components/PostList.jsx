import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api/wordpress';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchPosts({ perPage: 10, page })
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setPosts(list);
        setTotalPages(data._totalPages ?? 1);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading && posts.length === 0) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading…</div>;
  if (error && posts.length === 0) return <div className="container" style={{ padding: '3rem', color: 'crimson' }}>Error: {error}</div>;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Posts</h1>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {posts.map((post) => (
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
      {totalPages > 1 && (
        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            style={{ padding: '0.5rem 1rem', cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            style={{ padding: '0.5rem 1rem', cursor: page >= totalPages ? 'not-allowed' : 'pointer' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
