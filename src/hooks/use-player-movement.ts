import { useFrame } from '@react-three/fiber';
import { RefObject } from 'react';
import { Euler, Object3D, Vector3 } from 'three';
import { useKeyboardRef } from './use-keyboard-ref';
import { PhysicsApi } from './use-physics-object';
import { usePlayerData } from './use-player-data';

const SPEED = {
  forward: 10,
  backward: 4,
  rotate: 4,
};

const toValue = (bool?: Boolean) => (bool ? 1 : 0);

export const usePlayerMovement = (
  api: PhysicsApi,
  playerRef: RefObject<Object3D>
) => {
  const controllerInput = useKeyboardRef();

  const setCharacterState = usePlayerData((s) => s.setCharacterState);

  useFrame(() => {
    const forward =
      toValue(controllerInput.current.moveForward) -
      toValue(controllerInput.current.moveBackward);

    const sideways =
      toValue(controllerInput.current.moveLeft) -
      toValue(controllerInput.current.moveRight);

    api.setAngularVelocity(new Vector3(0, sideways * SPEED.rotate, 0));

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
