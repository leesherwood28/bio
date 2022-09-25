import { Physics, Debug, useBox } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import { Mesh } from 'three';
import Orbit from './dev/Orbit';
import Ground from './Ground';
import Player from './Player';

function Cube() {
  const [ref] = useBox<Mesh>(() => ({
    mass: 1,
    position: [0, 5, 0],
  }));
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry />
      <meshBasicMaterial color='hotpink' />
    </mesh>
  );
}

const Game: React.FunctionComponent = () => {
  return (
    <Canvas shadows>
      <Physics>
        <Debug color='black' scale={1.1}>
          <Cube />
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
        </Debug>
      </Physics>
    </Canvas>
  );
};

export default Game;
