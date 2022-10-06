import { useFrame } from '@react-three/fiber';
import { RefObject, useEffect, useRef } from 'react';
import { Euler, Object3D, Vector3 } from 'three';
import { useInputStore } from '../store/input.store';
import { PhysicsApi } from './use-physics-object';
import { PlayerCharacterState, usePlayerData } from './use-player-data';

const SPEED_MULTIPLIER = {
  forward: 10,
  backward: 4,
  rotate: 4,
};

const RUNNING_SPEED = 6;

const mapForwardSpeedToplayerState = (speed: number): PlayerCharacterState => {
  if (speed === 0) {
    return 'idle';
  }
  if (speed >= RUNNING_SPEED) {
    return 'running';
  }
  if (speed >= 0) {
    return 'walking';
  }
  return 'walking-backwards';
};

const MIN_MOVEMENT_AMOUNT = 0.2;

const removeBuffer = (input: number): number => {
  if (Math.abs(input) < MIN_MOVEMENT_AMOUNT) {
    return 0;
  }
  return input;
};

export const usePlayerMovement = (api: PhysicsApi<Object3D>) => {
  const controllerInput = useRef(useInputStore.getState().input);

  const setCharacterState = usePlayerData((s) => s.setCharacterState);

  useEffect(
    () =>
      useInputStore.subscribe(
        (state) => (controllerInput.current = state.input)
      ),
    []
  );

  useFrame(() => {
    let { forward, sideways } = controllerInput.current;
    forward = removeBuffer(forward);
    sideways = removeBuffer(sideways);

    api.setAngularVelocity(
      new Vector3(0, -sideways * SPEED_MULTIPLIER.rotate, 0)
    );

    const forwardMultiplier =
      forward > 0 ? SPEED_MULTIPLIER.forward : SPEED_MULTIPLIER.backward;
    const forwardSpeed = forwardMultiplier * forward;
    api.setVelocity(
      new Vector3(0, 0, forwardSpeed).applyEuler(
        api.objectRef.current?.rotation ?? new Euler()
      )
    );
    setCharacterState(mapForwardSpeedToplayerState(forwardSpeed));
  });
};
