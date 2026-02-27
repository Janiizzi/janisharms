import { useEffect, useRef } from 'react';
import Folder from '../components/Folder.tsx';
import Skills from '../assets/skills.svg?react';
import './skills.css';

const Home = () => {
  const svgContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const svgRoot = svgContainerRef.current?.querySelector('svg');
    if (!svgRoot) return;

    const icons = Array.from(svgRoot.querySelectorAll<SVGGraphicsElement>('g.icon'));
    const shadows = Array.from(svgRoot.querySelectorAll<SVGGraphicsElement>('g.shadow'));

    const cleanup = icons.map((icon, index) => {
      const shadow = shadows[index];
      if (!shadow) return () => undefined;

      const handleEnter = () => shadow.classList.add('is-hovered');
      const handleLeave = () => shadow.classList.remove('is-hovered');

      icon.addEventListener('mouseenter', handleEnter);
      icon.addEventListener('mouseleave', handleLeave);

      return () => {
        icon.removeEventListener('mouseenter', handleEnter);
        icon.removeEventListener('mouseleave', handleLeave);
        shadow.classList.remove('is-hovered');
      };
    });

    return () => {
      cleanup.forEach((dispose) => dispose());
    };
  }, []);

  return (
    <>
      <div className='flex flex-row md:items-center justify-around space-around items-start gap-2 p-[10vw] flex-wrap md:pt-[15vh]'>

        <div className='flex-1 '>
          <h1 className='text-4xl font-bold text-primary-white mb-4 min-w-[400px]'>
            <span className='type-line' style={{ animationDelay: '0.05s' }}>
              Hi, I&apos;m <span className='text-primary'>Janis</span>
            </span>
            <span className='type-line' style={{ animationDelay: '0.5s' }}>
              a <span className='text-primary'>CS Student</span> showcasing
            </span>
            <span className='type-line' style={{ animationDelay: '1.2s' }}>
              my learnings.
            </span>
          </h1>
          <div className='rounded-full bg-primary mb-4 animate-ballStretch'></div>
        </div>

        <div className='skills flex items-center justify-center flex-1' ref={svgContainerRef}>
          <Skills className='min-w-[300px] max-w-[700px]' />
        </div>

      </div>

      <div className='flex flex-row justify-center items-center h-[80vh] gap-4'>

        <div className='text-sm text-gray-500'>Download CV</div>
        <div>
          <Folder color='#fa8220' size={1} items={[
            <a href="/CV_2025_de.pdf" download>DE</a>,
            <a href="/CV_2025_en.pdf" download>EN</a>,
          ]} />
        </div>
      </div>
      <style>{`
      @keyframes ballStretch {
        0%, 16%, 34%, 58%, 76%, 100% {
          transform: scaleX(1) scaleY(1);
        }
        20%, 62% {
          transform: scaleX(1.35) scaleY(0.82) ;

        }
        24%, 66% {
          transform: scaleX(0.92) scaleY(1.06) translatex(50px);
        }
        28%, 70% {
          transform: scaleX(1.06) scaleY(0.96);
        }
      }

      .animate-ballStretch {
        transform-origin: center;
        animation: ballStretch 4s ease-in-out infinite;
      }
    `}</style>
      <style>{`
      @keyframes typewriterLineReveal {
        from {
          clip-path: inset(0 100% 0 0);
          opacity: 0.7;
        }
        to {
          clip-path: inset(0 0 0 0);
          opacity: 1;
        }
      }

      .type-line {
        display: block;
        clip-path: inset(0 100% 0 0);
        opacity: 0;
        animation: typewriterLineReveal 0.75s steps(28, end) forwards;
      }
    `}</style>
    </>
  )
}

export default Home