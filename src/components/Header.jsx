import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={headerStyle}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={logoStyle}>
          WordPress React
        </Link>
        <nav style={navStyle}>
          <Link to="/">Home</Link>
          <Link to="/posts" style={{ marginLeft: '1rem' }}>Posts</Link>
        </nav>
      </div>
    </header>
  );
}

const headerStyle = {
  padding: '1rem 0',
  borderBottom: '1px solid #e5e7eb',
  background: '#fff',
};

const logoStyle = {
  fontWeight: 700,
  fontSize: '1.25rem',
  color: '#1a1a1a',
};

const navStyle = {
  display: 'flex',
  gap: '1rem',
};
