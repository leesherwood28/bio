import { PublicApi } from '@react-three/cannon';

import { useFrame, useThree } from '@react-three/fiber';
import { RefObject, useEffect, useRef } from 'react';
import { Euler, Group, Vector3 } from 'three';
import { ControllerInput } from '../models/controller-input.model';
import { useKeyboard } from './use-keyboard';
import { usePlayerData } from './use-player-data';

const PLAYER_MOVE_SPEED = 10;
const PLAYER_ROTATE_SPEED = 4;

const SPEED = {
  forward: 10,
  backward: 4,
  rotate: 4,
};

const toValue = (bool?: Boolean) => (bool ? 1 : 0);

export const usePlayerMovement = (
  api: PublicApi,
  playerRef: RefObject<Group>
) => {
  const controllerInput = useKeyboard();

  const setCharacterState = usePlayerData((s) => s.setCharacterState);

  const vel = useRef([0, 0, 0]);
  const rotation = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  useEffect(() => {
    api.rotation.subscribe((v) => (rotation.current = v));
  }, [api.rotation]);

  useFrame(() => {
    const forward =
      toValue(controllerInput.moveForward) -
      toValue(controllerInput.moveBackward);

    const sideways =
      toValue(controllerInput.moveLeft) - toValue(controllerInput.moveRight);

    api.angularVelocity.set(0, sideways * SPEED.rotate, 0);

    const forwardSpeed = forward > 0 ? SPEED.forward : SPEED.backward;
    api.velocity.set(
      ...new Vector3(0, 0, -forward)
        .applyEuler(new Euler(...rotation.current))
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
