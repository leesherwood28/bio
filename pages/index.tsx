import type { NextPage } from 'next';
import Game from '../src/components/Game';
import Intro from '../src/components/Intro';
import { useInitialisationStore } from '../src/store/initialisation.store';

const Home: NextPage = () => {
  const initialAnimationDone = useInitialisationStore(
    (s) => s.initialAnimationDone
  );

  return (
    <div className='w-screen h-screen relative overflow-hidden'>
      <Intro />
      {initialAnimationDone && <Game />}
    </div>
  );
};

export default Home;
