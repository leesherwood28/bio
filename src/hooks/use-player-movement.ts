import { PublicApi } from '@react-three/cannon';

import { useFrame, useThree } from '@react-three/fiber';
import { RefObject, useEffect, useRef } from 'react';
import { Euler, Group, Vector3 } from 'three';
import { ControllerInput } from '../models/controller-input.model';
import { useKeyboard } from './use-keyboard';
import { usePlayerData } from './use-player-data';

const PLAYER_MOVE_SPEED = 10;

const convertBooleanToValue = (bool?: Boolean) => (bool ? 1 : 0);

const convertControlsIntoMovementVector = (controls: ControllerInput) => {
  return new Vector3(
    convertBooleanToValue(controls.moveRight) -
      convertBooleanToValue(controls.moveLeft),
    0,
    convertBooleanToValue(controls.moveBackward) -
      convertBooleanToValue(controls.moveForward)
  );
};

const getForward = (controls: ControllerInput) => {
  convertBooleanToValue(controls.moveForward) -
    convertBooleanToValue(controls.moveBackward);
};
const getSideward = (controls: ControllerInput) => {
  convertBooleanToValue(controls.moveRight) -
    convertBooleanToValue(controls.moveLeft);
};

export const usePlayerMovement = (
  api: PublicApi,
  playerRef: RefObject<Group>
) => {
  const controllerInput = useKeyboard();

  const setCharacterState = usePlayerData((s) => s.setCharacterState);

  const vel = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  useFrame(() => {
    const movementVector = convertControlsIntoMovementVector(controllerInput);

    if (playerRef.current) {
      //   console.log(playerRef.current.rotation);
      //   playerRef.current.rotateX(Math.random() * Math.PI);
      //   movementVector
      //     .applyEuler(playerRef.current.rotation)
      //     .multiply(new Vector3(1, 0, 1));
    }
    movementVector.normalize().multiplyScalar(PLAYER_MOVE_SPEED);

    if (movementVector.lengthSq() !== 0) {
      setCharacterState('running');
    } else {
      setCharacterState('idle');
    }

    api.velocity.set(movementVector.x, vel.current[1], movementVector.z);
  });
};
convertControlsIntoMovementVector;
