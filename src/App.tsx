import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Colorscheme = lazy(() => import('./pages/Colorscheme'));
const Contact = lazy(() => import('./pages/Contact'));
const Skills = lazy(() => import('./pages/Skills'));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/colorscheme" element={<Colorscheme />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
      </Suspense>
      <Footer />
    </>

  );
}

export default App;

// Nach dem ersten Paint alle anderen Chunks im Hintergrund laden
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    import('./pages/Projects');
    import('./pages/Skills');
    import('./pages/Contact');
    import('./pages/Colorscheme');
  }, { once: true });
}
