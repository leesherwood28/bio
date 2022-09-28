import { Physics, Debug, useBox } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import { Mesh } from 'three';
import Orbit from './dev/Orbit';
import Ground from './Ground';
import Planet from './Planet';
import Player from './Player';
import { Stars } from './Stars';

const Game: React.FunctionComponent = () => {
  return (
    <Canvas camera={{ far: 10000 }} shadows style={{ background: 'black' }}>
      <Ground />
      <Player />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <Stars />
      <Planet />
      {/* Remove */}
      <Orbit />
    </Canvas>
  );
};

export default Game;
