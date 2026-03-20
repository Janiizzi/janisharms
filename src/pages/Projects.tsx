import ProjectCard from '../components/CardComponents/ProjectCard';
import projectsData from '../data/projects.json';
import type { Project } from '../data/projects';
import RevealOnView from '../components/RevealOnView';
import { Helmet } from 'react-helmet-async';

const projects = projectsData as Project[];

const Projects = () => {
  return (
    <div className='flex flex-col'>

      <div className='projects flex flex-col gap-1 align-items-center justify-center text-center mt-6 md:mt-10 mx-4 md:mx-10'>
          <RevealOnView className='text-3xl md:text-4xl font-bold text-primary-white'>
            Projects
          </RevealOnView>

          <RevealOnView className='text-primary-grey text-lg font-normal' delayMs={120}>
            Here are some of the projects I've worked on. Click on any project to learn more about it.
          </RevealOnView>
        </div>

      <div className='skillmenu grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6 mx-4 md:mx-10 max-w-7xl self-center'>

        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}

      </div>

      <Helmet>
        <title>Projects – Janis Harms</title>
        <meta name="description" content="A portfolio of projects and design work created throughout my studies at ETH Zürich." />
        <link rel="canonical" href="https://janisharms.ch/projects" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://janisharms.ch/projects" />
        <meta property="og:title" content="Projects – Janis Harms" />
        <meta property="og:description" content="A portfolio of projects and design work created throughout my studies at ETH Zürich." />
        <meta property="og:image" content="https://janisharms.ch/logo_janis_og.png" />
      </Helmet>

    </div>
  )
}

export default Projects
