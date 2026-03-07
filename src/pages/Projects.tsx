import OuterCard from '../components/CardComponents/OuterCard';
import ProjectCard from '../components/CardComponents/ProjectCard';

const Projects = () => {
  return (
    <div>
      <div className='skillmenu flex flex-row gap-4 md:gap-6 '>
        <ProjectCard />
        <OuterCard className='flex flex-col'>
          Hi
        </OuterCard>
        <OuterCard className='flex flex-col'>
          Hi
        </OuterCard>
      </div>

    </div>
  )
}

export default Projects