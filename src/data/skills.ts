
import reactIcon from '../assets/skill-icons/react.svg';
import javaIcon from '../assets/skill-icons/java.svg';
import pythonIcon from '../assets/skill-icons/python.svg';
import tsIcon from '../assets/skill-icons/ts.svg';
import sqlIcon from '../assets/skill-icons/sql.svg';
import dockerIcon from '../assets/skill-icons/docker.svg';
import psIcon from '../assets/skill-icons/ps.svg';
import aiIcon from '../assets/skill-icons/ai.svg';
import idIcon from '../assets/skill-icons/id.svg';
import haskellIcon from '../assets/skill-icons/haskell.svg';
import prIcon from '../assets/skill-icons/pr.svg';
import gitIcon from '../assets/skill-icons/git.svg';
import aeIcon from '../assets/skill-icons/ae.svg';
import jsIcon from '../assets/skill-icons/js.svg';
import reactIconL from '../assets/skill-icons/react-l.svg';
import javaIconL from '../assets/skill-icons/java-l.svg';
import pythonIconL from '../assets/skill-icons/python-l.svg';
import tsIconL from '../assets/skill-icons/ts-l.svg';
import sqlIconL from '../assets/skill-icons/sql-l.svg';
import dockerIconL from '../assets/skill-icons/docker-l.svg';
import psIconL from '../assets/skill-icons/ps-l.svg';
import aiIconL from '../assets/skill-icons/ai-l.svg';
import idIconL from '../assets/skill-icons/id-l.svg';
import haskellIconL from '../assets/skill-icons/haskell-l.svg';
import prIconL from '../assets/skill-icons/pr-l.svg';
import gitIconL from '../assets/skill-icons/git-l.svg';
import aeIconL from '../assets/skill-icons/ae-l.svg';
import jsIconL from '../assets/skill-icons/js-l.svg';

export interface Skill {
    name: string;
    path: string;
    iconUrl: string;
    iconUrlAlt?: string;
}

export const skillMap: Record<string, Skill> = {
    "Tailwind CSS": {
        name: 'Tailwind CSS',
        path: '#tailwind',
        iconUrl: ""
    },
    "CSS": {
        name: 'CSS',
        path: '#css',
        iconUrl: ""
    },
    "Next.js": {
        name: 'Next.js',
        path: '#nextjs',
        iconUrl: "",
        iconUrlAlt: ""
    },
    "React": {
        name: 'React',
        path: '#react',
        iconUrl: reactIcon,
        iconUrlAlt: reactIconL
    },
    "Java": {
        name: 'Java',
        path: '#java',
        iconUrl: javaIcon,
        iconUrlAlt: javaIconL
    },
    "Python": {
        name: 'Python',
        path: '#python',
        iconUrl: pythonIcon,
        iconUrlAlt: pythonIconL
    },
    "TypeScript": {
        name: 'TypeScript',
        path: '#ts',
        iconUrl: tsIcon,
        iconUrlAlt: tsIconL
    },
    "PostgreSQL": {
        name: 'PostgreSQL',
        path: '#sql',
        iconUrl: sqlIcon,
        iconUrlAlt: sqlIconL
    },
    "MySQL": {
        name: 'MySQL',
        path: '#sql',
        iconUrl: sqlIcon,
        iconUrlAlt: sqlIconL
    },
    "SQL": {
        name: 'SQL',
        path: '#sql',
        iconUrl: sqlIcon,
        iconUrlAlt: sqlIconL
    },
    "Docker": {
        name: 'Docker',
        path: '#docker',
        iconUrl: dockerIcon,
        iconUrlAlt: dockerIconL
    },
    "Photoshop": {
        name: 'Photoshop',
        path: '#ps',
        iconUrl: psIcon,
        iconUrlAlt: psIconL
    },
    "Illustrator": {
        name: 'Illustrator',
        path: '#ai',
        iconUrl: aiIcon,
        iconUrlAlt: aiIconL
    },
    "InDesign": {
        name: 'InDesign',
        path: '#id',
        iconUrl: idIcon,
        iconUrlAlt: idIconL
    },
    "Haskell": {
        name: 'Haskell',
        path: '#haskell',
        iconUrl: haskellIcon,
        iconUrlAlt: haskellIconL
    },
    "Premiere": {
        name: 'Premiere Pro',
        path: '#pr',
        iconUrl: prIcon,
        iconUrlAlt: prIconL
    },
    "Git": {
        name: 'Git',
        path: '#git',
        iconUrl: gitIcon,
        iconUrlAlt: gitIconL
    },
    "AfterEffects": {
        name: 'After Effects',
        path: '#ae',
        iconUrl: aeIcon,
        iconUrlAlt: aeIconL
    },
    "Node.js": {
        name: 'Node.js',
        path: '#nodejs',
        iconUrl: ""
    },
    "JavaScript": {
        name: 'JavaScript',
        path: '#js',
        iconUrl: jsIcon,
        iconUrlAlt: jsIconL
    },
    "C": {
        name: 'C',
        path: '#c',
        iconUrl: ""
    }
}