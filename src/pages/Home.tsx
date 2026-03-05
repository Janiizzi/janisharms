import Folder from '../components/Folder.tsx';
import Skills from '../components/SkillMenu.tsx';

const Home = () => {
  return (
    <div className='flex flex-col'>
      <Skills />

      <div className='relative flex flex-col items-center justify-center gap-4 p-10'>
        <div className='h-px w-80 bg-primary-white/50 mx-auto my-4' />
      </div>

      <div className='flex flex-row justify-center items-center gap-10 p-10'>

        <div className='flex flex-col gap-2 items-center'>
          <Folder color='#fa8220' size={1} items={[
            <a href="/CV_2025_de.pdf" download>DE</a>,
            <a href="/CV_2025_en.pdf" download>EN</a>,
          ]} />

        </div>



        <div className=''>
          <h1 className='text-3xl font-bold text-primary-white mb-4 md:min-w-[400px]'>
            <span className='type-line' style={{ animationDelay: '0.05s' }}>
              Download <br /> my CV
            </span>
          </h1>
        </div>
      </div>

    </div >
  )
}

export default Home