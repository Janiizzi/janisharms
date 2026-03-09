interface SkillCardProps {
  id: string;
  title: string;
  description: string;
  skills: {
    id: string;
    title: string;
    description: string;
    mapTo: string;
  }[];
}

const SkillCard = ({ id, title, description, skills }: SkillCardProps) => {
  return (
    <div id={id}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div>
        {skills.map((skill) => (
          <div key={skill.id}>
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillCard