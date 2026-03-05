interface SpacerProps {
  height?: string;
  mdHeight?: string;
  showLine?: boolean;
  onlySmallScreen?: boolean;
  lineClassName?: string;
  lineLengthPercent?: number;
}

const Spacer = ({
  height = 'h-10',
  mdHeight = 'h-14',
  showLine = false,
  lineClassName = 'via-primary-white/55',
  lineLengthPercent = 60,
  onlySmallScreen = false,
}: SpacerProps) => {
  const mdHeightClass = mdHeight ? `md:${mdHeight}` : '';
  const safeLineLengthPercent = Math.min(100, Math.max(0, lineLengthPercent));

  return (
    <div className={`${height} ${mdHeightClass} w-full flex items-center justify-center`.trim()} aria-hidden='true'>
      {showLine ? (
        <div
          className={`relative h-px ${onlySmallScreen ? 'md:h-0' : ''} rounded-full overflow-visible bg-gradient-to-r from-transparent to-transparent`}
          style={{ width: `${safeLineLengthPercent}%` }}
        >
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-transparent ${lineClassName}`.trim()} />
          <div className={`absolute inset-0 rounded-full blur-[5px] opacity-80 bg-gradient-to-r from-transparent to-transparent ${lineClassName}`.trim()} />
        </div>
      ) : null}
    </div>
  );
};

export default Spacer