import { useFrame } from '@react-three/fiber';
import { RigidBodyApiRef } from '@react-three/rapier';
import { RefObject, useCallback, useEffect, useRef } from 'react';
import { Euler, Object3D, Vector3 } from 'three';
import { isNil } from '../functions/is-nil.fn';
import { Input } from '../models/input.model';
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

export const usePlayerMovement = (api: RigidBodyApiRef) => {
  const setCharacterState = usePlayerData((s) => s.setCharacterState);

  const setPlayerMovement = useCallback((input: Input) => {
    if (isNil(api.current)) {
      return;
    }

    let { forward, sideways } = input;
    forward = removeBuffer(forward);
    sideways = removeBuffer(sideways);

    api.current.setAngvel(
      new Vector3(0, -sideways * SPEED_MULTIPLIER.rotate, 0)
    );

    const forwardMultiplier =
      forward > 0 ? SPEED_MULTIPLIER.forward : SPEED_MULTIPLIER.backward;
    const forwardSpeed = forwardMultiplier * forward;
    api.current.setLinvel(
      new Vector3(0, 0, forwardSpeed).applyQuaternion(api.current.rotation())
    );
    setCharacterState(mapForwardSpeedToplayerState(forwardSpeed));
  }, []);

  useEffect(
    () => useInputStore.subscribe((i) => setPlayerMovement(i.input)),
    [setPlayerMovement]
  );
};
