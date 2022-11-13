import { Preload } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Suspense } from 'react';
import { PCFSoftShadowMap, WebGLRenderer } from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { WORLD } from '../contants/world.const';
import { useInitialisationStore } from '../store/initialisation.store';
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
import GameLoadedDetector from './loading/GameLoadedDetector';
import LoadingGameBar from './loading/LoadingGameBar';
import Player from './player/Player';
import WelcomeInfo from './welcome/WelcomeInfo';

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
  const { loadingDone, showWelcome } = useInitialisationStore();
  return (
    <>
      <div id='game-container' className='w-full h-full absolute'>
        <Canvas
          camera={{ far: 5000 }}
          shadows={{ type: PCFSoftShadowMap }}
          //@ts-ignore
          gl={(canvas) => new DualRenderer(canvas)}
        >
          <Suspense fallback={null}>
            <Physics timeStep='vary' gravity={[0, -30, 0]}>
              <Ground />
              <Player />
              {WORLD.foilage && <Foliage />}
              <Sheild />
              <Obelisks />
            </Physics>
            <Stars />
            <BlackHole />
            <GameCamera />
            <ambientLight intensity={0.6} />
            <Preload all />
            {!loadingDone && <GameLoadedDetector />}
            {/* Remove */}
            {/* <Stats />
             */}
            <Orbit />
          </Suspense>
        </Canvas>
        <KeyboardInput />
        <JoystickInput />
      </div>
      {showWelcome && <WelcomeInfo />}
      <LoadingGameBar />
    </>
  );
};

export default Game;
