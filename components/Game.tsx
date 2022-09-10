import { Canvas } from '@react-three/fiber';
import Ground from './Ground';
import Orbit from './dev/Orbit';
import CameraHelper from './dev/CameraHelper';

const Game: React.FunctionComponent = () => {
  return (
    <Canvas camera={{ position: [0, 4, 10] }}>
      <Ground />
      <ambientLight intensity={0.3} />
      <directionalLight color='blue' position={[1, 1, 5]} />

      {/* Remove */}
      {/* <Orbit /> */}
      {/* <CameraHelper /> */}
    </Canvas>
  );
};

export default Game;
