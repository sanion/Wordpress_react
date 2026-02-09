import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPost } from '../api/wordpress';

export default function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchPost(slug)
      .then(setPost)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading…</div>;
  if (error) return <div className="container" style={{ padding: '3rem', color: 'crimson' }}>Error: {error}</div>;
  if (!post) return <div className="container" style={{ padding: '3rem' }}>Post not found.</div>;

  const featuredUrl = post.featured_image_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <article className="container" style={{ padding: '2rem 0', maxWidth: '720px' }}>
      <Link to="/posts" style={{ marginBottom: '1rem', display: 'inline-block' }}>← Back to posts</Link>
      {featuredUrl && (
        <img
          src={featuredUrl}
          alt=""
          style={{ width: '100%', borderRadius: '8px', marginBottom: '1.5rem' }}
        />
      )}
      <h1 style={{ marginBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: post.title?.rendered }} />
      <div style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        {new Date(post.date).toLocaleDateString()} · {post._embedded?.author?.[0]?.name || 'Author'}
      </div>
      <div
        className="post-content"
        style={{ lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: post.content?.rendered }}
      />
    </article>
  );
}
