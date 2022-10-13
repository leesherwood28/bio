import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { PCFSoftShadowMap } from 'three';
import BlackHole from './3d/BlackHole';
import Foliage from './3d/Foliage';
import Ground from './3d/Ground';
import Obelisks from './3d/Obelisks';
import Physics from './3d/Physics';
import Player from './player/Player';
import Sheild from './3d/Sheild';
import Stars from './3d/Stars';
import Orbit from './dev/Orbit';
import JoystickInput from './input/JoystickInput';
import KeyboardInput from './input/KeyboardInput';

const Game: React.FunctionComponent = () => {
  return (
    <>
      <Canvas
        className='w-full h-full'
        camera={{ far: 5000 }}
        shadows={{ type: PCFSoftShadowMap }}
        style={{ background: 'black' }}
      >
        <Physics />
        <Player />
        <Ground />
        <Sheild />
        <ambientLight intensity={0.6} />

        <Stars />
        <BlackHole />
        <Foliage />

        {/* <Planet /> */}
        {/* Remove */}

        <Obelisks />
        <Stats />
        <Orbit />
      </Canvas>
      <KeyboardInput />
      <JoystickInput />
    </>
  );
};

export default Game;
