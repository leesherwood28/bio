import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Euler, Group, Matrix4, Vector2, Vector3 } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { ControllerState, useGameStore } from '../state/game-store';
import PlayerIdle from './player-states/PlayerIdle';
import PlayerRunning from './player-states/PlayerRunning';

const PLAYER_MOVE_SPEED = 0.04;

const convertBooleanToValue = (bool?: Boolean) => (bool ? 1 : 0);

const convertControlsIntoMovementVector = (controls: ControllerState) => {
  return new Vector3(
    convertBooleanToValue(controls.right) -
      convertBooleanToValue(controls.left),
    0,
    convertBooleanToValue(controls.backward) -
      convertBooleanToValue(controls.forward)
  )
    .normalize()
    .multiplyScalar(PLAYER_MOVE_SPEED);
};

const Player: React.FunctionComponent = () => {
  const player = useGameStore((s) => s.player.object);
  const controls = useGameStore((s) => s.controls);
  const set = useGameStore((s) => s.set);

  const { scene, animations } = useGLTF(
    '/player/scene.gltf',
    'https://www.gstatic.com/draco/versioned/decoders/1.4.0/'
  ) as GLTF;
  const { actions } = useAnimations(animations, player);

  useLayoutEffect(() => {
    set((s) => ({ player: { ...s.player, animations: actions } }));
  }, [actions]);

  useFrame(() => {
    if (!player.current) {
      return;
    }
    const movementVector = convertControlsIntoMovementVector(controls);

    // TODO Use state machine instead and fix for different
    // refresh rates
    if (movementVector.lengthSq() !== 0) {
      set((s) => ({ player: { ...s.player, state: 'running' } }));
      player.current.lookAt(
        player.current.position
          .clone()
          .add(movementVector.clone().multiplyScalar(-1))
      );
    } else {
      set((s) => ({ player: { ...s.player, state: 'idle' } }));
    }

    player.current.position.x += movementVector.x;
    player.current.position.y += movementVector.y;
    player.current.position.z += movementVector.z;
  });

  return (
    <group ref={player} position={[0, 3, 5]}>
      <primitive
        object={scene}
        rotation={[0, Math.PI, 0]}
        scale={[0.01, 0.01, 0.01]}
      >
        <PlayerIdle />
        <PlayerRunning />
      </primitive>
    </group>
  );
};

export default Player;
