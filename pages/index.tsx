import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Intro from '../src/components/Intro';
import LoadingGameFiles from '../src/components/loading/LoadingGameFiles';
import { useInitialisationStore } from '../src/store/initialisation.store';

const Game = dynamic(() => import('../src/components/Game'), {
  suspense: true,
});

const Home: NextPage = () => {
  const initialAnimationDone = useInitialisationStore(
    (s) => s.initialAnimationDone
  );

  return (
    <div className='w-screen h-screen relative overflow-hidden'>
      <Intro />
      <Suspense fallback={<LoadingGameFiles />}>
        <Game />
      </Suspense>
    </div>
  );
};

export default Home;
