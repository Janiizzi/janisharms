import type { SkillId } from './skills';

export interface Project {
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
    type: 'design' | 'webapp' | 'mobileapp' | 'game' | 'other';
    skills: SkillId[];
}
