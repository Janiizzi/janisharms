import { Loadingbar } from './Loadingbar';

interface LoadingbarCollectionProps {
    skillList: { name: string; progress: number;}[];
    maxCount: number;
}

const LoadingbarCollection = ({ skillList, maxCount }: LoadingbarCollectionProps) => {
  return (
    <div>
      {skillList.map((skill, index) => (
        <Loadingbar
          key={index}
          title={skill.name}
          progress={skill.progress}
          maxCount={maxCount}
          delayMs={index * 80}
          className=''
        />
      ))}
    </div>
  )
}

export default LoadingbarCollection