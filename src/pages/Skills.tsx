import { Helmet } from 'react-helmet-async';
import SkillCard from "../components/CardComponents/SkillCard"
import skills from "../data/skills.json"
import RevealOnView from "../components/RevealOnView";
import Statistics from '../components/Statistics';

const Skills = () => {
  return (
    <div className='skills-page flex flex-col [&>*:last-child]:mb-16'>
      <Helmet>
        <title>Skills – Janis Harms</title>
        <meta name='description' content='An overview of the technologies and tools I have learned and worked with, including web development, frameworks, and more.' />
        <link rel='canonical' href='https://janisharms.ch/skills' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://janisharms.ch/skills' />
        <meta property='og:title' content='Skills – Janis Harms' />
        <meta property='og:description' content='An overview of the technologies and tools I have learned and worked with, including web development, frameworks, and more.' />
        <meta property='og:image' content='https://janisharms.ch/logo_janis_og.png' />
      </Helmet>

      <div className='projects flex flex-col gap-1 align-items-center justify-center text-center mt-6 md:mt-10 mx-4 md:mx-10'>
        <RevealOnView className='text-3xl md:text-4xl font-bold text-primary-white'>
          Personal Skills
        </RevealOnView>

        <RevealOnView className='text-primary-grey text-lg font-normal' delayMs={60}>
          Here are some of the skills I've developed.
        </RevealOnView>
      </div>

      <div className='hidden md:flex md:justify-center'>
        <Statistics />
      </div>

      {skills.map((skillCategory, key) => (
        <SkillCard
          key={key}
          {...skillCategory}
        />
      ))}
    </div>
  )
}

export default Skills