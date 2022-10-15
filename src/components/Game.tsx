import { Canvas } from '@react-three/fiber';
import { Camera, PCFSoftShadowMap, Scene, WebGLRenderer } from 'three';
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
import { Renderer } from '@react-three/fiber/dist/declarations/src/core/store';
import {
  CSS3DObject,
  CSS3DRenderer,
} from 'three/examples/jsm/renderers/CSS3DRenderer';

class DualRenderer implements Renderer {
  private readonly webGlRenderer = new WebGLRenderer({ canvas: this.canvas });
  private readonly cssRenderer = new CSS3DRenderer();

  constructor(private canvas: HTMLCanvasElement) {
    this.cssRenderer.domElement.style.position = 'absolute';
    this.cssRenderer.domElement.style.top = '0';
    this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
    document
      .querySelector('#game-container')
      ?.prepend(this.cssRenderer.domElement);
  }

  render(scene: Scene, camera: Camera) {
    this.webGlRenderer.render(scene, camera);
    this.cssRenderer.render(scene, camera);
  }

  setPixelRatio(ratio: number) {
    this.webGlRenderer.setPixelRatio(ratio);
  }

  setSize(width: number, height: number, updateStyle: boolean) {
    this.webGlRenderer.setSize(width, height, updateStyle);
    this.cssRenderer.setSize(width, height);
  }
}

const Game: React.FunctionComponent = () => {
  return (
    <div id='game-container' className='w-full h-full'>
      <Canvas
        className='w-full h-full'
        camera={{ far: 5000 }}
        shadows={{ type: PCFSoftShadowMap }}
        style={{ background: 'black' }}
      >
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
