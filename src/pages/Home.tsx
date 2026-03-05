import Skills from '../components/SkillMenu.tsx';
import Spacer from '../components/Spacer.tsx';
import FolderMenu from '../components/FolderMenu.tsx';

const Home = () => {
  return (
    <div className='flex flex-col'>
      
      <Skills />
      <Spacer height='h-10' mdHeight='h-14' />

      <FolderMenu />

    </div >
  )
}

export default Home