import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/Projects';
import Colorscheme from './pages/Colorscheme';
import Contact from './pages/Contact';
import Skills from './pages/Skills';
import Java from './pages/skills/Java';
import Adobe from './pages/skills/Adobe';


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
        <Route path="/skills/java" element={<Java />} />
        <Route path="/skills/adobe" element={<Adobe />} />
      </Routes>
    </>

  );
}

export default App;
