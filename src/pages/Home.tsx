import { Helmet } from 'react-helmet-async';
import Skills from '../components/SkillMenu.tsx';
import Spacer from '../components/Spacer.tsx';
import FolderMenu from '../components/FolderMenu.tsx';

const Home = () => {
  return (
    <div className='flex flex-col'>
      <Helmet>
        <title>Janis Harms – Portfolio</title>
        <meta name="description" content="A personal webpage - Exploring projects, experiments, and lessons learned on my journey as a CS Student at ETH Zürich." />
        <link rel="canonical" href="https://janisharms.ch/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://janisharms.ch/" />
        <meta property="og:title" content="Janis Harms – Portfolio" />
        <meta property="og:image" content="https://janisharms.ch/logo_janis_og.png" />
        <meta property="og:description" content="A personal webpage - Exploring projects, experiments, and lessons learned on my journey as a CS Student at ETH Zürich." />
      </Helmet>
      
      <Skills />
      <Spacer height='h-20' mdHeight='h-14' showLine={true} lineClassName='via-primary-white/20' lineLengthPercent={50} onlySmallScreen={true} />

      <FolderMenu />


    </div >
  )
}

export default Home