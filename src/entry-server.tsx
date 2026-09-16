import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Valldoaido from './pages/Valldoaido'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import InConstruction from './pages/InConstruction'
import Colorscheme from './pages/Colorscheme'
import NotFound from './pages/NotFound'

export function render(url: string) {
  const helmetContext: Record<string, unknown> = {}

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/valldoaido" element={<Valldoaido />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/in-construction" element={<InConstruction />} />
              <Route path="/colorscheme" element={<Colorscheme />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </StaticRouter>
    </HelmetProvider>
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const helmet = (helmetContext as any).helmet
  return { html, helmet }
}
