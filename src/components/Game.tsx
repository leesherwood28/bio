import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Orbit from './dev/Orbit';
import Ground from './Ground';
import Player from './Player';

const Game: React.FunctionComponent = () => {
  return (
    <Canvas camera={{ position: [0, 4, 10] }}>
      <Ground />
      <Suspense fallback={null}>
        <Player />
      </Suspense>
      <ambientLight intensity={0.5} />
      {/* Remove */}
      <Orbit />
    </Canvas>
  );
};

export default Game;
