import { useFrame } from '@react-three/fiber';
import React from 'react';
import { Vector3 } from 'three';
import { ControllerState, useGameStore } from '../../state/game-store';

const PLAYER_MOVE_SPEED = 0.15;

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

const PlayerMovement: React.FunctionComponent = () => {
  const player = useGameStore((s) => s.player.object);
  const controls = useGameStore((s) => s.controls);
  const set = useGameStore((s) => s.set);
  // TODO subscribe to store
  // instead of getting these console logs running
  // every render
  //   console.log('frame');

  useFrame(() => {
    if (!player.current) {
      return;
    }
    const movementVector = convertControlsIntoMovementVector(controls);

    // TODO fix for different refresh rates
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

  return null;
};

export default PlayerMovement;
