import type { Project } from "../data/projects";
import projectsData from "../data/projects.json";
import LoadingbarCollection from './LoadingbarCollection';

const projects = projectsData as Project[];

const Statistics = () => {
    const skillListApplications = prepareSkillList(projects, ['webapp', 'mobileapp']);
    const skillListDesigns = prepareSkillList(projects, ['design']);

    const appCount = projects.filter((p) => p.type === 'webapp' || p.type === 'mobileapp').length;
    const designCount = projects.filter((p) => p.type === 'design').length;

    return (
        <div className='flex flex-col max-w-6xl self-center gap-6 mt-10 w-full px-10'>
            <div className="">
                <div className='text-4xl font-bold text-primary-white'>Statistics</div>
                <div className='text-primary-grey text-lg  mt-1'>
                    Documented projects: <span className='text-primary not-italic font-semibold'>{projects.length}</span> 
                </div>
                <div className='text-primary-grey mt-1 text-base leading-relaxed'>
                    This is a breakdown of the skills used across all projects, categorized by application and design work. The progress bars indicate how many projects utilize each skill, giving insight into the most frequently used technologies and tools in my portfolio.
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-9'>
                <div className='flex flex-col gap-2 flex-1'>
                    <div className='flex items-baseline gap-2 text-xl'>
                        <span className='text-primary-white font-semibold'>Application Projects:</span>
                        <span className='text-primary font-bold'>{appCount}</span>
                    </div>
                    <LoadingbarCollection skillList={skillListApplications} maxCount={skillListApplications.length} />
                </div>

                <div className='flex flex-col gap-2 flex-1'>
                    <div className='flex items-baseline gap-2 text-xl'>
                        <span className='text-primary-white font-semibold'>Design Projects:</span>
                        <span className='text-primary font-bold'>{designCount}</span>
                    </div>
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
