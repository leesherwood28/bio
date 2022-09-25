import { Physics, Debug } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import Orbit from './dev/Orbit';
import Ground from './Ground';
import Player from './Player';

const Game: React.FunctionComponent = () => {
  return (
    <Canvas shadows>
      <Physics>
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
      </Physics>
    </Canvas>
  );
};

export default Game;
