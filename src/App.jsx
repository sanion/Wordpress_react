import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PostList from './components/PostList';
import SinglePost from './components/SinglePost';
import Page from './components/Page';
import Home from './components/Home';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<SinglePost />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/page/:slug" element={<Page />} />
        </Routes>
      </main>
    </>
  );
}

function AppWithRouter() {
  const basename = typeof window !== 'undefined' && window.wpReactTheme?.siteUrl
    ? new URL(window.wpReactTheme.siteUrl).pathname.replace(/\/$/, '') || '/'
    : '/';
  return (
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  );
}

export default AppWithRouter;
