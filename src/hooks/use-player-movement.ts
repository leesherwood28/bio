import { PublicApi } from '@react-three/cannon';

import { useFrame } from '@react-three/fiber';
import { Euler, Vector3 } from 'three';
import { useKeyboardRef } from './use-keyboard-ref';
import { usePlayerData } from './use-player-data';
import { usePlayerPhysicsRef } from './use-player-physics-ref';

const SPEED = {
  forward: 10,
  backward: 4,
  rotate: 4,
};

const toValue = (bool?: Boolean) => (bool ? 1 : 0);

export const usePlayerMovement = (api: PublicApi) => {
  const controllerInput = useKeyboardRef();

  const setCharacterState = usePlayerData((s) => s.setCharacterState);
  const playerPhysics = usePlayerPhysicsRef(api);

  useFrame(() => {
    const forward =
      toValue(controllerInput.current.moveForward) -
      toValue(controllerInput.current.moveBackward);

    const sideways =
      toValue(controllerInput.current.moveLeft) -
      toValue(controllerInput.current.moveRight);

    api.angularVelocity.set(0, sideways * SPEED.rotate, 0);

    const forwardSpeed = forward > 0 ? SPEED.forward : SPEED.backward;
    api.velocity.set(
      ...new Vector3(0, 0, forward)
        .applyEuler(new Euler(...playerPhysics.current.rotation))
        .normalize()
        .multiplyScalar(forwardSpeed)
        .toArray()
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
