import type { ReactNode } from 'react';

interface OuterCardProps {
	children: ReactNode;
	className?: string;
}

const OuterCard = ({ children, className = '' }: OuterCardProps) => {
	return (
		<div className={`w-full max-w-3xl rounded-2xl border border-primary-white/15 bg-secondary-background/70 p-6 md:p-8 ${className}`.trim()}>
			{children}
		</div>
	);
};

export default OuterCard;
