import { useEffect, useRef } from 'react';
import SkillsGraphic from '../assets/skills.svg?react';
import './SkillMenu.css';
import { useNavigate } from 'react-router-dom';

const Skills = () => {
	const svgContainerRef = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const container = svgContainerRef.current;
		if (!container) return;

		const iconTargetMap: Record<string, string> = {
			icon1: 'python',
			icon2: 'java',
			icon3: 'haskell',
			icon4: 'sql',
			icon5: 'git',
			icon6: 'react',
			icon7: 'docker',
			icon8: 'id',
			icon9: 'pr',
			icon10: 'ae',
			icon11: 'ps',
			icon12: 'ai',
		};

		const cleanupFns: Array<() => void> = [];

		Object.entries(iconTargetMap).forEach(([iconClass, anchorId]) => {
			const iconNodes = container.querySelectorAll<SVGGElement>(`.shadow.${iconClass}`);

			iconNodes.forEach((node) => {
				node.style.cursor = 'pointer';

				const handleClick = () => {
					navigate(`/skills#${anchorId}`);
				};

				const handleKeyDown = (event: KeyboardEvent) => {
					if (event.key === 'Enter' || event.key === ' ') {
						event.preventDefault();
						handleClick();
					}
				};

				node.setAttribute('role', 'link');
				node.setAttribute('tabindex', '0');
				node.addEventListener('click', handleClick);
				node.addEventListener('keydown', handleKeyDown);

				cleanupFns.push(() => {
					node.removeEventListener('click', handleClick);
					node.removeEventListener('keydown', handleKeyDown);
				});
			});
		});

		return () => {
			cleanupFns.forEach((cleanup) => cleanup());
		};
	}, [navigate]);

	return (
		<div className='flex flex-row md:items-center justify-around space-around items-start gap-2 p-[10vw] flex-wrap md:pt-[15vh]'>
			<div className='flex flex-col flex-1 '>
				<h1 className='text-4xl font-bold text-primary-white mb-4 md:min-w-[400px]'>
					<span className='type-line' style={{ animationDelay: '0.05s' }}>
						Hi, I&apos;m <span className='text-primary'>Janis </span>
					</span>
					<span className='type-line' style={{ animationDelay: '0.5s' }}>
						a <span className='text-primary'>CS Student</span> showcasing
					</span>
					<span className='type-line' style={{ animationDelay: '1.2s' }}>
						my learnings.
					</span>
				</h1>
				<div className=' rounded-full bg-primary mb-4 animate-ballStretch w-15 h-3'></div>
			</div>

			<div className='skills flex items-center justify-center flex-1' ref={svgContainerRef}>
				<SkillsGraphic className='skills-graphic min-w-[300px] max-w-[700px]' />
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
				animation: ballStretch 10s ease-in-out infinite;
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
		</div>
	);
};

export default Skills;
