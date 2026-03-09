import { skillMap } from '../../data/skills.ts'
import RevealOnView from '../RevealOnView.tsx'

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
        <div id={id} className='flex flex-col px-6 md:px-16 lg:px-32 pt-8 md:pt-30 gap-8 max-w-7xl self-center'>
            <RevealOnView >
                <div className='text-3xl md:text-4xl font-bold text-primary-white text-primary-white mt-2'>{title}</div>
                <p className='text-primary-grey mt-2 mb-8'>{description}</p>
            </RevealOnView>

            <div className='flex flex-col gap-12'>
                {skills.map((skill, skillKey) => {
                    const isEven = skillKey % 2 === 0;
                    const skillEntry = skillMap[skill.mapTo];
                    const hasAlt = !isEven && !!skillEntry?.iconUrlAlt;
                    return (
                        <RevealOnView key={skill.id} delayMs={skillKey * 60}>
                            <div id={`${skillMap[skill.mapTo]?.path.replace('#', '')}`} className={`flex items-center gap-4 md:gap-8 ${isEven ? 'flex-row' : 'sm:flex-row-reverse'}`}>
                                {skillEntry?.iconUrl && (
                                    <>
                                        {/* normal icon: always on mobile, hidden on sm+ when alt exists */}
                                        <img
                                            src={skillEntry.iconUrl}
                                            alt={skill.title}
                                            className={`w-20 h-20 md:w-35 md:h-35 flex-shrink-0 ${hasAlt ? 'sm:hidden' : ''}`}
                                        />
                                        {/* alt icon: only on sm+ for odd items */}
                                        {hasAlt && (
                                            <img
                                                src={skillEntry.iconUrlAlt}
                                                alt={skill.title}
                                                className='w-20 h-20 md:w-35 md:h-35 flex-shrink-0 hidden sm:block'
                                            />
                                        )}
                                    </>
                                )}
                                <div className={`flex flex-col md:w-[40%] ${isEven ? 'text-left' : 'sm:text-right'}`}>
                                    <div className='text-xl md:text-2xl font-bold text-primary-white'>
                                        {skill.title}
                                    </div>
                                    <div className='text-primary-grey mt-1'>
                                        {skill.description}
                                    </div>
                                </div>
                            </div>
                            
                        </RevealOnView>
                    );
                })}
            </div>
        </div>
    )
}

export default SkillCard