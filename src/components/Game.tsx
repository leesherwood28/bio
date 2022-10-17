import { Canvas } from '@react-three/fiber';
import {
  Camera,
  Event,
  Object3D,
  PCFSoftShadowMap,
  Scene,
  WebGLRenderer,
} from 'three';
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
import { WebGLRendererParameters } from 'three';

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

const DualRendererThree = function (canvas: HTMLCanvasElement) {
  //@ts-ignore
  WebGLRenderer.apply(this, [{ canvas }]);
  //@ts-ignore
  this.cssRenderer = new CSS3DRenderer();
  //@ts-ignore
  this.cssRenderer.domElement.style.position = 'absolute';
  //@ts-ignore
  this.cssRenderer.domElement.style.top = '0';
  //@ts-ignore
  this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
  document
    .querySelector('#game-container')
    //@ts-ignore
    ?.prepend(this.cssRenderer.domElement);

  //@ts-ignore
  const currentRender = this.render.bind(this);
  //@ts-ignore
  this.render = function (scene, camera) {
    currentRender(scene, camera);
    this.cssRenderer.render(scene, camera);
  };

  //@ts-ignore
  const currentSetSize = this.setSize.bind(this);
  //@ts-ignore
  this.setSize = function (
    width: number,
    height: number,
    updateStyle: boolean
  ) {
    currentSetSize(width, height, updateStyle);
    this.cssRenderer.setSize(width, height);
  };
};
DualRendererThree.prototype = WebGLRenderer.prototype;
DualRendererThree.prototype.constructor = DualRendererThree;

class DualRendererTwo extends WebGLRenderer {
  private readonly cssRenderer = new CSS3DRenderer();

  constructor(private canvas: HTMLCanvasElement) {
    super({ canvas });
    console.log('here wtf');

    this.cssRenderer.domElement.style.position = 'absolute';
    this.cssRenderer.domElement.style.top = '0';
    this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
    console.log('here wtf like');

    console.log(this.render);
    //@ts-ignore
    delete this.render;
    document
      .querySelector('#game-container')
      ?.prepend(this.cssRenderer.domElement);

    Object.defineProperty(this, 'render', (scene: Scene, camera: Camera) => {});
  }
  override render(scene: Scene, camera: Camera): void {
    console.log('here');
    // super.render(scene, camera);
    this.cssRenderer.render(scene, camera);
  }

  override setSize(width: number, height: number, updateStyle: boolean) {
    console.log('here 2');
    super.setSize(width, height, updateStyle);
    this.cssRenderer.setSize(width, height);
  }
}

const Game: React.FunctionComponent = () => {
  return (
    <div id='game-container' className='w-full h-full relative'>
      <Canvas
        className='w-full h-full absolute inset-0'
        camera={{ far: 5000 }}
        shadows={{ type: PCFSoftShadowMap }}
        //@ts-ignore
        gl={(canvas) => new DualRendererThree(canvas)}
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
