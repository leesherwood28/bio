import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { PCFSoftShadowMap, WebGLRenderer } from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import Orbit from './dev/Orbit';
import BlackHole from './environment/BlackHole';
import Foliage from './environment/Foliage';
import Ground from './environment/Ground';
import Obelisks from './environment/Obelisks';
import Sheild from './environment/Sheild';
import Stars from './environment/Stars';
import GameCamera from './game/GameCamera';
import JoystickInput from './input/JoystickInput';
import KeyboardInput from './input/KeyboardInput';
import Player from './player/Player';

const DualRenderer = function (canvas: HTMLCanvasElement) {
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
  //@ts-ignore
  document
    .getElementById('game-container')
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
DualRenderer.prototype = WebGLRenderer.prototype;
DualRenderer.prototype.constructor = DualRenderer;

const Game: React.FunctionComponent = () => {
  return (
    <div id='game-container' className='w-full h-full relative'>
      <Canvas
        camera={{ far: 5000 }}
        shadows={{ type: PCFSoftShadowMap }}
        //@ts-ignore
        gl={(canvas) => new DualRenderer(canvas)}
      >
        <Physics timeStep='vary' gravity={[0, -30, 0]}>
          <Player />
          <Ground />
          <Foliage />
          <Sheild />
          <Obelisks />
        </Physics>
        <ambientLight intensity={0.6} />
        <Stars />
        <BlackHole />
        {/* <Planet /> */}
        {/* Remove */}
        <GameCamera />
        <Stats />
        <Orbit />
      </Canvas>
      <KeyboardInput />
      <JoystickInput />
    </div>
  );
};

export default Game;
