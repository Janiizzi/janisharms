import type { Project } from "../data/projects";
import projectsData from "../data/projects.json";
import LoadingbarCollection from './LoadingbarCollection';
import RevealOnView from './RevealOnView';

const projects = projectsData as Project[];

const Statistics = () => {
    const skillListApplications = prepareSkillList(projects, ['webapp', 'mobileapp']);
    const skillListDesigns = prepareSkillList(projects, ['design']);

    const appCount = projects.filter((p) => p.type === 'webapp' || p.type === 'mobileapp').length;
    const designCount = projects.filter((p) => p.type === 'design').length;

    return (
        <div className='flex flex-col max-w-7xl self-center gap-6 w-full px-6 md:px-16 lg:px-32 my-25'>
            <RevealOnView>
                <div className='text-3xl md:text-4xl font-bold text-primary-white'>Statistics</div>
                <div className='text-primary-grey text-lg mt-1'>
                    Documented projects: <span className='text-primary not-italic font-semibold'>{projects.length}</span>
                </div>
                <div className='text-primary-grey mt-1 text-base leading-relaxed'>
                    This is a breakdown of the languages and frameworks used across all projects, categorized by application and design work.
                </div>
            </RevealOnView>

            <div className='flex flex-col md:flex-row gap-9'>
                <div className='flex flex-col gap-2 flex-1'>
                    <RevealOnView delayMs={100}>
                        <div className='flex items-baseline gap-2 text-xl'>
                            <span className='text-primary-white font-semibold'>Application Projects:</span>
                            <span className='text-primary font-bold'>{appCount}</span>
                        </div>
                    </RevealOnView>
                    <LoadingbarCollection skillList={skillListApplications} maxCount={skillListApplications.length} />
                </div>

                <div className='flex flex-col gap-2 flex-1'>
                    <RevealOnView delayMs={200}>
                        <div className='flex items-baseline gap-2 text-xl'>
                            <span className='text-primary-white font-semibold'>Design Projects:</span>
                            <span className='text-primary font-bold'>{designCount}</span>
                        </div>
                    </RevealOnView>
                    <LoadingbarCollection skillList={skillListDesigns} maxCount={skillListDesigns.length} />
                </div>
            </div>
        </div>
    )
}

function prepareSkillList(projects: Project[], ofType: string[]) {
    const skillMap: { [key: string]: number } = {};

    projects.forEach(project => {
        if (ofType.includes(project.type)) {
            project.skills.forEach((skill: string) => {

                skillMap[skill] = (skillMap[skill] || 0) + 1;
            });
        }
    });

    return Object.entries(skillMap).map(([name, progress]) => ({
        name,
        progress,
    }));
}

export default Statistics
