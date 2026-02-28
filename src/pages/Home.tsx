import Folder from '../components/Folder.tsx';
import Skills from '../components/Skills';
import Docker from '../assets/skill-icons/git.svg?react';

const Home = () => {
  return (
    <div>
      <Skills />

      <div className='flex flex-row justify-center items-center h-[80vh] gap-4'>

        <div className='text-sm text-gray-500'>Download CV</div>
        <div>
          <Folder color='#fa8220' size={1} items={[
            <a href="/CV_2025_de.pdf" download>DE</a>,
            <a href="/CV_2025_en.pdf" download>EN</a>,
          ]} />
        </div>
      </div>
      <Docker className='w-70' />

      </div>
  )
}

export default Home