import Folder from '../components/Folder.tsx';
import Skills from '../components/SkillMenu.tsx';
import Spacer from '../components/Spacer.tsx';

const Home = () => {
  return (
    <div className='flex flex-col'>
      <Skills />


  <Spacer height='h-10' mdHeight='h-14' />

      <div className='flex justify-center items-center p-15'>

        <div className='flex flex-col md:flex-row gap-5'>
          <div className='flex gap-2 items-center justify-center'>
            <Folder color='#fa8220' size={1} items={[
              <a href="/CV_2025_de.pdf" download>DE</a>,
              <a href="/CV_2025_en.pdf" download>EN</a>,
            ]} />

          </div>

          <div className=' flex items-center justify-center'>
            <h1 className='text-xl md:text-2xl font-bold text-primary-white p-3'>
              <span className='type-line ' style={{ animationDelay: '0.05s' }}>
                Download CV
              </span>
            </h1>
          </div>
        </div>
      </div>

    </div >
  )
}

export default Home