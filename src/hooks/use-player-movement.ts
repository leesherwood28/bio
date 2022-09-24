import { PublicApi } from '@react-three/cannon';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Euler, Vector3 } from 'three';
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

export const usePlayerMovement = (api: PublicApi) => {
  const controllerInput = useKeyboard();
  const { camera } = useThree();

  const setCharacterState = usePlayerData((s) => s.setCharacterState);

  const vel = useRef([0, 0, 0]);
  const direction = useRef(new Euler(0, 0, 0));

  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  useFrame(() => {
    const cameraRotation = camera.rotation.clone();

    const movementVector = convertControlsIntoMovementVector(controllerInput)
      .applyEuler(cameraRotation)
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
