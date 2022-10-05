import { Physics, Debug, useBox } from '@react-three/cannon';
import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Mesh } from 'three';
import BlackHole from './BlackHole';
import Orbit from './dev/Orbit';
import { GlassDome } from './GlassDome';
import Ground from './Ground';
import Planet from './Planet';
import Player from './Player';
import { Stars } from './Stars';

const Game: React.FunctionComponent = () => {
  return (
    <Canvas camera={{ far: 5000 }} shadows style={{ background: 'black' }}>
      <Ground />
      <Player />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 200, 900]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <Stars />
      <BlackHole />
      <GlassDome />
      {/* <Planet /> */}
      {/* Remove */}
      <Stats />
      <Orbit />
    </Canvas>
  );
};

export default Game;
