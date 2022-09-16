import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Orbit from './dev/Orbit';
import Ground from './Ground';
import KeyboardController from './KeyboardController';
import Player from './player/Player';

const Game: React.FunctionComponent = () => {
  return (
    <Canvas camera={{ position: [0, 4, 10] }}>
      <Ground />
      <Player />
      <KeyboardController />
      <ambientLight intensity={0.5} />
      {/* Remove */}
      <Orbit />
    </Canvas>
  );
};

export default Game;
