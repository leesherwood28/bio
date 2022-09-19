import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
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
  const set = useGameStore((s) => s.set);

  const controlsRef = useRef(useGameStore.getState().controls);
  useEffect(() =>
    useGameStore.subscribe((state) => (controlsRef.current = state.controls))
  );

  useFrame(() => {
    const movementVector = convertControlsIntoMovementVector(
      controlsRef.current
    );

    // TODO fix for different refresh rates
    if (movementVector.lengthSq() !== 0) {
      set((s) => ({ player: { ...s.player, state: 'running' } }));
    } else {
      set((s) => ({ player: { ...s.player, state: 'idle' } }));
    }
  });

  return null;
};

export default PlayerMovement;
