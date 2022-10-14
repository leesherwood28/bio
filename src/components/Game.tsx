import { Canvas } from '@react-three/fiber';
import { PCFSoftShadowMap } from 'three';
import Orbit from './dev/Orbit';
import BlackHole from './environment/BlackHole';
import Foliage from './environment/Foliage';
import Ground from './environment/Ground';
import Obelisks from './environment/Obelisks';
import Physics from './environment/Physics';
import Sheild from './environment/Sheild';
import Stars from './environment/Stars';
import GameCamera from './game/GameCamera';
import JoystickInput from './input/JoystickInput';
import KeyboardInput from './input/KeyboardInput';
import Player from './player/Player';

import {} from '@react-three/fiber';
import CSS3DSceneRenderer from './three-constructs/CSS3DSceneRenderer';

const Game: React.FunctionComponent = () => {
  return (
    <div id='game-container' className='w-full h-full'>
      <Canvas
        className='w-full h-full'
        camera={{ far: 5000 }}
        shadows={{ type: PCFSoftShadowMap }}
        style={{ background: 'black' }}
      >
        |
        <CSS3DSceneRenderer />
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
        <GameCamera />
        <Obelisks />
        {/* <Stats /> */}
        <Orbit />
      </Canvas>
      <KeyboardInput />
      <JoystickInput />
    </div>
  );
};

export default Game;
