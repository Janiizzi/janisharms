import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/Projects';
import Colorscheme from './pages/Colorscheme';
import Contact from './pages/Contact';
import Skills from './pages/Skills';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<About />} />
        <Route path="/colorscheme" element={<Colorscheme />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
      <Footer />
    </>

  );
}

export default App;
