import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Intro from '../src/components/Intro';
import { useInitialisationStore } from '../src/store/initialisation.store';
import { Suspense } from 'react';
import LoadingGameFiles from '../src/components/loading/LoadingGameFiles';

const Game = dynamic(() => import('../src/components/Game'), {
  suspense: true,
});

const Home: NextPage = () => {
  const initialAnimationDone = useInitialisationStore(
    (s) => s.initialAnimationDone
  );

  return (
    <div className='w-screen h-screen relative overflow-hidden'>
      <Head>
        <title>Lee Sherwood</title>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Anton&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Intro />
      <Suspense fallback={<LoadingGameFiles />}>
        <Game />
      </Suspense>
    </div>
  );
};

export default Home;
