import { useEffect, useRef, useState } from 'react';
import Folder from './Folder.tsx';

const FolderMenu = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const current = containerRef.current;
		if (!current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.2 }
		);

		observer.observe(current);

		return () => {
			observer.unobserve(current);
			observer.disconnect();
		};
	}, []);

	return (
		<div ref={containerRef} className='flex justify-center items-center p-15'>
			<div className='flex flex-col md:flex-row gap-5'>
				<div
					className={`flex gap-2 items-center justify-center transition-all duration-700 ease-out ${
						isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
					}`}
				>
					<Folder color='#fa8220' size={1} items={[
						<a href='/CV_2025_de.pdf' download>DE</a>,
						<a href='/CV_2025_en.pdf' download>EN</a>,
					]} />
				</div>

				<div
					className={`flex items-center justify-center transition-all duration-700 ease-out ${
						isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
					}`}
				>
					<h1 className='text-xl md:text-2xl font-bold text-primary-white p-3'>
						<span className='' >
							Download CV
						</span>
					</h1>
				</div>
			</div>
		</div>
	);
};

export default FolderMenu;
