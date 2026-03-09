import SkillCard from "../components/CardComponents/SkillCard"
import skills from "../data/skills.json"
import RevealOnView from "../components/RevealOnView";

const Skills = () => {
  return (
    <div className='skills-page flex flex-col [&>*:last-child]:mb-16'>
      <div className='projects flex flex-col gap-1 align-items-center justify-center text-center mt-6 md:mt-10 mx-4 md:mx-10'>
          <RevealOnView className='text-3xl md:text-4xl font-bold text-primary-white'>
            Personal Skills
          </RevealOnView>

          <RevealOnView className='text-primary-grey text-lg font-normal' delayMs={60}>
            Here are some of the skills I've developed.
          </RevealOnView>
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