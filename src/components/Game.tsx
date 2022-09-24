import { Physics, Debug } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Orbit from './dev/Orbit';
import Ground from './Ground';
import KeyboardController from './KeyboardController';
import Player from './player/Player';

const Game: React.FunctionComponent = () => {
  return (
    <Canvas shadows camera={{ position: [0, 4, 10] }}>
      <Physics>
        <Debug color='black' scale={1.1}>
          <Ground />
          <Player />
          <KeyboardController />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 10]}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          {/* Remove */}
          <Orbit />
        </Debug>
      </Physics>
    </Canvas>
  );
};

export default Game;
