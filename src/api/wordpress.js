/**
 * WordPress REST API client.
 * Uses wpReactTheme from wp_localize_script when running inside WordPress.
 */

const getConfig = () => {
  if (typeof window !== 'undefined' && window.wpReactTheme) {
    return window.wpReactTheme;
  }
  return {
    apiUrl: '/wp-json/wp/v2/',
    siteUrl: '/',
    nonce: '',
  };
};

const baseUrl = () => {
  if (typeof window === 'undefined') return '/wp-json/wp/v2/';
  const { apiUrl, siteUrl } = getConfig();
  if (apiUrl.startsWith('http')) return apiUrl;
  return `${window.location.origin}${apiUrl.startsWith('/') ? '' : siteUrl}${apiUrl}`;
};

const headers = () => {
  const { nonce } = getConfig();
  const h = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (nonce) h['X-WP-Nonce'] = nonce;
  return h;
};

export async function fetchPosts(params = {}) {
  const url = new URL('posts', baseUrl());
  url.searchParams.set('_embed', '1');
  url.searchParams.set('per_page', String(params.perPage || 10));
  if (params.page) url.searchParams.set('page', String(params.page));
  if (params.search) url.searchParams.set('search', params.search);

  const res = await fetch(url.toString(), { headers: headers() });
  if (!res.ok) throw new Error(`Posts: ${res.status}`);
  const data = await res.json();
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
  return Object.assign(Array.isArray(data) ? data : [], { _totalPages: totalPages });
}

export async function fetchPost(idOrSlug) {
  const isId = /^\d+$/.test(String(idOrSlug));
  const path = isId ? `posts/${idOrSlug}` : `posts?slug=${encodeURIComponent(idOrSlug)}&_embed=1`;
  const url = `${baseUrl()}${path}`;

  const res = await fetch(url, { headers: headers() });
  if (!res.ok) throw new Error(`Post: ${res.status}`);

  const data = await res.json();
  return isId ? data : (Array.isArray(data) ? data[0] : data);
}

export async function fetchPages(params = {}) {
  const url = new URL('pages', baseUrl());
  url.searchParams.set('_embed', '1');
  url.searchParams.set('per_page', String(params.perPage || 10));
  if (params.page) url.searchParams.set('page', String(params.page));

  const res = await fetch(url.toString(), { headers: headers() });
  if (!res.ok) throw new Error(`Pages: ${res.status}`);
  return res.json();
}

export async function fetchPage(idOrSlug) {
  const isId = /^\d+$/.test(String(idOrSlug));
  const path = isId ? `pages/${idOrSlug}` : `pages?slug=${encodeURIComponent(idOrSlug)}&_embed=1`;
  const url = `${baseUrl()}${path}`;

  const res = await fetch(url, { headers: headers() });
  if (!res.ok) throw new Error(`Page: ${res.status}`);

  const data = await res.json();
  return isId ? data : (Array.isArray(data) ? data[0] : data);
}

export default { fetchPosts, fetchPost, fetchPages, fetchPage, getConfig, baseUrl };
