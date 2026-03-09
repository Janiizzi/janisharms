import SkillCard from "../components/CardComponents/SkillCard"
import skills from "../data/skills.json"
import RevealOnView from "../components/RevealOnView";

const Skills = () => {
  return (
    <div className='skills-page flex flex-col'>
      <div className='projects flex flex-col gap-1 align-items-center justify-center text-center mt-6 md:mt-10 mx-4 md:mx-10'>
          <RevealOnView className='text-3xl md:text-4xl font-bold text-primary-white'>
            Projects
          </RevealOnView>

          <RevealOnView className='text-primary-grey text-lg font-normal' delayMs={120}>
            Here are some of the projects I've worked on. Click on any project to learn more about it.
          </RevealOnView>
        </div>

      {skills.map((skillCategory) => (
        <SkillCard
          key={skillCategory.id}
          {...skillCategory}
        />
      ))}
    </div>
  )
}

      export default Skills