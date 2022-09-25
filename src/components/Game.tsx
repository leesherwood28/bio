import { Physics, Debug, useBox } from '@react-three/cannon';
import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Mesh } from 'three';
import Orbit from './dev/Orbit';
import Ground from './Ground';
import Player from './Player';

const Game: React.FunctionComponent = () => {
  return (
    <Canvas shadows style={{ background: 'black' }}>
      <Ground />
      <Player />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      {/* Remove */}
      <Orbit />
      <Stars />
    </Canvas>
  );
};

export default Game;
