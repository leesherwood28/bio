import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Intro from '../src/components/Intro';
import LoadingGameFiles from '../src/components/loading/LoadingGameFiles';

const Game = dynamic(() => import('../src/components/Game'), {
  ssr: false,
  loading: () => <LoadingGameFiles />,
});

const Home: NextPage = () => {
  return (
    <div
      onScroll={(e) => e.stopPropagation()}
      className='w-screen h-full relative overflow-hidden'
    >
      <Game />
      <Intro />
    </div>
  );
};

export default Home;
