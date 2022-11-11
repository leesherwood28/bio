import { useSpring, animated } from '@react-spring/web';
import { useProgress } from '@react-three/drei';

const LoadingGame: React.FunctionComponent = () => {
  const { active, progress, item } = useProgress();

  const animatedBarStyles = useSpring({
    from: { scaleX: 0 },
    to: { scaleX: progress / 100 },
  });
  console.log({ item, progress });
  return (
    <div className='absolute bottom-4 py-2 flex flex-col items-center gap-2 w-full'>
      <span className='text-white text-xl'>
        Loading: {progress.toFixed(0)} %
      </span>
      <div className='h-2 w-3/5'>
        <animated.div
          style={{
            transformOrigin: 'center left',
            ...animatedBarStyles,
          }}
          className='h-full bg-orange-500'
        ></animated.div>
      </div>
    </div>
  );
};
export default LoadingGame;
