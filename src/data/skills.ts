
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

export interface Skill {
    name: string;
    path: string;
    iconUrl: string;
}

export const skillMap: Record<string, Skill> = {
    "React": {
        name: 'React',
        path: '#frontend',
        iconUrl: reactIcon
    },
    "Java": {
        name: 'Java',
        path: '#java',
        iconUrl: javaIcon
    },
    "Python": {
        name: 'Python',
        path: '#python',
        iconUrl: pythonIcon
    },
    "TypeScript": {
        name: 'TypeScript',
        path: '#frontend',
        iconUrl: tsIcon
    },
    "PostgreSQL": {
        name: 'PostgreSQL',
        path: '#sql',
        iconUrl: sqlIcon
    },
    "Docker": {
        name: 'Docker',
        path: '#docker',
        iconUrl: dockerIcon
    },
    "Photoshop": {
        name: 'Photoshop',
        path: '#adobe',
        iconUrl: psIcon
    },
    "Illustrator": {
        name: 'Illustrator',
        path: '#adobe',
        iconUrl: aiIcon
    },
    "Indesign": {
        name: 'Indesign',
        path: '#adobe',
        iconUrl: idIcon
    },
    "Haskell": {
        name: 'Haskell',
        path: '#haskell',
        iconUrl: haskellIcon
    },
    "Premiere": {
        name: 'Premiere Pro',
        path: '#adobe',
        iconUrl: prIcon
    },
    "Git": {
        name: 'Git',
        path: '#git',
        iconUrl: gitIcon
    },
    "AfterEffects": {
        name: 'After Effects',
        path: '#adobe',
        iconUrl: aeIcon
    },
    "Node.js": {
        name: 'Node.js',
        path: '#backend',
        iconUrl: ""
    },
    "JavaScript": {
        name: 'JavaScript',
        path: '#frontend',
        iconUrl: jsIcon
    }
}