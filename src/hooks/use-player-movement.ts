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
  const rotation = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  useEffect(() => {
    api.rotation.subscribe((v) => (rotation.current = v));
  }, [api.rotation]);

  useFrame(() => {
    let movementVector = convertControlsIntoMovementVector(controllerInput);

    let [x, y, z] = rotation.current;
    y -= (movementVector.x * 0.08) % (2 * Math.PI);
    api.rotation.set(x, y, z);
    const rotationEuler = new Euler(x, y, z);

    movementVector = movementVector
      .multiply(new Vector3(0, 0, 1))
      .applyEuler(rotationEuler)
      .multiply(new Vector3(1, 0, 1))
      .normalize()
      .multiplyScalar(PLAYER_MOVE_SPEED);

    if (movementVector.lengthSq() !== 0) {
      setCharacterState('running');
    } else {
      setCharacterState('idle');
    }

    api.velocity.set(movementVector.x, vel.current[1], movementVector.z);
  });
};
convertControlsIntoMovementVector;
