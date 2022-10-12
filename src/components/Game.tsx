import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { PCFSoftShadowMap } from 'three';
import BlackHole from './BlackHole';
import Orbit from './dev/Orbit';
import Foliage from './Foliage';
import { GlassDome } from './GlassDome';
import Ground from './Ground';
import JoystickInput from './JoystickInput';
import KeyboardInput from './KeyboardInput';
import Obelisks from './Obelisks';
import Physics from './Physics';
import Player from './Player';
import Sheild from './Sheild';
import { Stars } from './Stars';

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
        <GlassDome />
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
