import { useFrame } from '@react-three/fiber';
import { RefObject, useEffect, useRef } from 'react';
import { Euler, Object3D, Vector3 } from 'three';
import { useInputStore } from '../store/input.store';
import { PhysicsApi } from './use-physics-object';
import { usePlayerData } from './use-player-data';

const SPEED = {
  forward: 10,
  backward: 4,
  rotate: 4,
};

export const usePlayerMovement = (
  api: PhysicsApi,
  playerRef: RefObject<Object3D>
) => {
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
    const forward = controllerInput.current.forward;
    const sideways = controllerInput.current.sideways;

    api.setAngularVelocity(new Vector3(0, -sideways * SPEED.rotate, 0));

    const forwardSpeed = forward > 0 ? SPEED.forward : SPEED.backward;
    api.setVelocity(
      new Vector3(0, 0, forward)
        .applyEuler(playerRef.current?.rotation ?? new Euler())
        .normalize()
        .multiplyScalar(forwardSpeed)
    );

    if (forward !== 0) {
      if (forward > 0) {
        setCharacterState('running');
      } else {
        setCharacterState('walking-backwards');
      }
    } else {
      setCharacterState('idle');
    }
  });
};
