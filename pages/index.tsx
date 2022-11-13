import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Intro from '../src/components/Intro';
import LoadingGameFiles from '../src/components/loading/LoadingGameFiles';

const Game = dynamic(() => import('../src/components/Game'), {
  ssr: false,
  loading: () => <LoadingGameFiles />,
});

const Home: NextPage = () => {
  return (
    <div className='w-screen h-screen relative overflow-hidden'>
      <Game />
      <Intro />
    </div>
  );
};

export default Home;
