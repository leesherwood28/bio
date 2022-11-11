import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Intro from '../src/components/Intro';
import LoadingGameFiles from '../src/components/loading/LoadingGameFiles';

const Game = dynamic(() => import('../src/components/Game'), {
  suspense: true,
});

const Home: NextPage = () => {
  return (
    <div className='w-screen h-screen relative overflow-hidden'>
      <Suspense fallback={<LoadingGameFiles />}>
        <Game />
      </Suspense>
      <Intro />
    </div>
  );
};

export default Home;
