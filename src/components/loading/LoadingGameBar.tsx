import { useSpring, animated } from '@react-spring/web';
import { useProgress } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
import { useInitialisationStore } from '../../store/initialisation.store';

const LoadingGameBar: React.FunctionComponent = () => {
  const { progress, loaded, active } = useProgress();
  const { loadingDone } = useInitialisationStore();
  const previousLoadedAmount = useRef(0);

  useEffect(() => {
    previousLoadedAmount.current = progress;
  }, [progress]);

  const animatedBarStyles = useSpring({
    from: { scaleX: 0 },
    to: { scaleX: Math.max(progress, previousLoadedAmount.current) / 100 },
  });

  return (
    <>
      {!loadingDone && (
        <div className='absolute bottom-4 py-2 flex flex-col items-center gap-2 w-full z-10'>
          <span className='text-white text-xl'>Loading...</span>
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
      )}
    </>
  );
};
export default LoadingGameBar;
