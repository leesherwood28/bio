import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Euler, Group, Matrix4, Vector2, Vector3 } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { ControllerState, useGameStore } from '../../state/game-store';

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
  const player = useGameStore((s) => s.player);
  const controls = useGameStore((s) => s.controls);

  const { scene, animations } = useGLTF(
    '/player/scene.gltf',
    'https://www.gstatic.com/draco/versioned/decoders/1.4.0/'
  ) as GLTF;
  const { actions } = useAnimations(animations, player);

  useLayoutEffect(() => {
    actions['Root|Idle 01 ']?.play();
  }, [actions]);

  useFrame(() => {
    if (!player.current) {
      return;
    }
    const movementVector = convertControlsIntoMovementVector(controls);

    // TODO Use state machine instead and fix for different
    // refresh rates
    if (movementVector.lengthSq() !== 0) {
      actions['Root|Idle 01 ']?.stop();
      actions['Root|Run  02 ']?.play();
      player.current.lookAt(
        player.current.position
          .clone()
          .add(movementVector.clone().multiplyScalar(-1))
      );
    } else {
      actions['Root|Run  02 ']?.stop();
      actions['Root|Idle 01 ']?.play();
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
      />
    </group>
  );
};

export default Player;
