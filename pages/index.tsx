import type { NextPage } from 'next';
import Head from 'next/head';
// import Game from '../src/components/Game';
import Intro from '../src/components/Intro';
import { useInitialisationStore } from '../src/store/initialisation.store';

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

      {/* <Game /> */}
      <Intro />
    </div>
  );
};

export default Home;
