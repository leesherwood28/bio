import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { PCFSoftShadowMap } from 'three';
import BlackHole from './environment/BlackHole';
import Foliage from './environment/Foliage';
import Ground from './environment/Ground';
import Obelisks from './environment/Obelisks';
import Physics from './environment/Physics';
import Player from './player/Player';
import Sheild from './environment/Sheild';
import Stars from './environment/Stars';
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
