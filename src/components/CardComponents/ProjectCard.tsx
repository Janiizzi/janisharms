import { Fragment, useState } from 'react';
import OuterCard from './OuterCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { skillMap } from '../../data/skills';
import { HashLink } from 'react-router-hash-link';
import RevealOnView from '../RevealOnView';
import type { Project } from "../../data/projects";

const renderDescriptionWithLinks = (text: string) => {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts: Array<{ type: 'text' | 'link'; value: string; href?: string }> = [];
  let lastIndex = 0;
  let match = linkRegex.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }

    parts.push({ type: 'link', value: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
    match = linkRegex.exec(text);
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }

  if (parts.length === 0) {
    return text;
  }

  return parts.map((part, index) => {
    if (part.type === 'link' && part.href) {
      return (
        <a
          key={`link-${index}`}
          href={part.href}
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary hover:underline'
        >
          {part.value}
        </a>
      );
    }

    return <Fragment key={`text-${index}`}>{part.value}</Fragment>;
  });
};




const ProjectCard = ({ title, description, imageUrl, projectUrl, type, skills }: Project) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  return (
    <RevealOnView className='w-full'>
      <OuterCard className={`flex flex-col gap-2 h-full`}>
        <div
          className='picture-holder relative rounded-lg overflow-hidden'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <a href={projectUrl} target='_blank' rel='noopener noreferrer'>
            <img src={imageUrl} alt={title} className='rounded-lg' />
            <div className={`absolute inset-0 transition rounded-lg flex items-center justify-center ${isHovered ? 'bg-black/60' : 'bg-black/20'}`}>
              <div className={`flex items-center align-items gap-2 text-white text-base font-semibold transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <FontAwesomeIcon icon={faEye} />
                {type === 'webapp' || type === 'mobileapp' ? 'View Demo' : 'View Design'}
              </div>
            </div>
          </a>
        </div>
        <div>
          <div className='title text-2xl font-bold text-primary-white mt-2'>
            {title}
          </div>
          <div className='flex flex-wrap gap-x-1'>
            {skills.map((skill, index) => (
              (showAllSkills || index < 4) ? (
                <span
                  key={index}
                  className='relative inline-block'
                >
                  <HashLink to={`/skills${skillMap[skill]?.path}`} className='text-base text-primary hover:underline transition'>
                    {skillMap[skill] ? skillMap[skill].name : skill}
                    {(showAllSkills ? index < skills.length - 1 : index < Math.min(skills.length - 1, 3)) && ','}
                  </HashLink>
                </span>
              ) : null
            ))}
            {skills.length > 4 && (
              <button
                onClick={() => setShowAllSkills(prev => !prev)}
                className='text-base text-primary-grey hover:text-primary transition cursor-pointer'
              >
                {showAllSkills ? 'less' : '...'}
              </button>
            )}
          </div>


          <div className='description text-primary-grey flex-1 mt-2'>
            {renderDescriptionWithLinks(description)}
          </div>
        </div>
        <div className='button mt-2'>
          <a href={projectUrl} className='inline-block rounded-lg bg-primary px-4 py-2 font-semibold text-primary-background transition hover:brightness-110'>
            {type === 'webapp' || type === 'mobileapp' ? 'View Demo' : 'View Design'}
          </a>
        </div>
      </OuterCard>
    </RevealOnView>
  )
}

export default ProjectCard