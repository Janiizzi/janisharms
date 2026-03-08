import ProjectCard from '../components/CardComponents/ProjectCard';
import projects from '../data/projects.json';
import RevealOnView from '../components/RevealOnView';

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

      <div className='skillmenu flex flex-row flex-wrap justify-center mt-6'>

        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            projectUrl={project.projectUrl}
            projectIsApp={project.projectIsApp}
            skills={project.skills}
          />
        ))}

      </div>

    </div>
  )
}

export default Projects