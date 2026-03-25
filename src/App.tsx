import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Colorscheme = lazy(() => import('./pages/Colorscheme'));
const Contact = lazy(() => import('./pages/Contact'));
const Skills = lazy(() => import('./pages/Skills'));
const InConstruction = lazy(() => import('./pages/InConstruction'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Privacy = lazy(() => import('./pages/Privacy'));

function App() {
  return (
    <>
    <div className="flex min-h-screen flex-col bg-primary-background">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[60vh] bg-primary-background" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/colorscheme" element={<Colorscheme />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/in-construction" element={<InConstruction />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
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
