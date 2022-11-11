import { useProgress } from '@react-three/drei';

const LoadingGame: React.FunctionComponent = () => {
  const { active, progress } = useProgress();
  console.log(progress);
  return (
    <div className='absolute bottom-4 py-2 flex flex-col items-center gap-2 w-full'>
      <span className='text-white text-xl'>
        Loading: {progress.toFixed(0)} %
      </span>
      <div className='h-4 w-full'>
        <div
          style={{
            transformOrigin: 'center left',
            transform: `scaleX(${progress / 100})`,
          }}
          className='h-full w-full bg-orange-500'
        ></div>
      </div>
    </div>
  );
};
export default LoadingGame;
