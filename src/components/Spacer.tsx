interface SpacerProps {
  height?: string;
  mdHeight?: string;
}

const Spacer = ({ height = 'h-10', mdHeight = 'h-14' }: SpacerProps) => {
  const mdHeightClass = mdHeight ? `md:${mdHeight}` : '';

  return <div className={`${height} ${mdHeightClass} w-full`.trim()} aria-hidden='true' />;
}

export default Spacer