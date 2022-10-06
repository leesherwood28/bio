import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import BlackHole from './BlackHole';
import Orbit from './dev/Orbit';
import { GlassDome } from './GlassDome';
import Ground from './Ground';
import JoystickInput from './JoystickInput';
import KeyboardInput from './KeyboardInput';
import Physics from './Physics';
import Player from './Player';
import { Stars } from './Stars';

const Game: React.FunctionComponent = () => {
  return (
    <>
      <Canvas
        className='w-full h-full'
        camera={{ far: 5000 }}
        shadows
        style={{ background: 'black' }}
      >
        <Physics />
        <Player />
        <Ground />
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
      <KeyboardInput />
      <JoystickInput />
    </>
  );
};

export default Game;
