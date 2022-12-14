import { useFrame } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { Euler, Vector3 } from 'three';
import { isNil } from '../../functions/is-nil.fn';
import { useInputStore } from '../../store/input.store';
import { PlayerCharacterState, usePlayerStore } from '../../store/player.store';

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

const PlayerMovement: React.FunctionComponent = () => {
  const setCharacterState = usePlayerStore((s) => s.setCharacterState);

  useFrame(() => {
    const playerApi = usePlayerStore.getState().playerApi;
    if (isNil(playerApi.current)) {
      return;
    }
    const isPaused = usePlayerStore.getState().isPaused;
    const controllerInput = useInputStore.getState().input;

    if (isPaused) {
      playerApi.current.setAngvel(new Vector3());
      playerApi.current.setLinvel(new Vector3());
      return;
    }

    let { forward, sideways } = controllerInput;
    forward = removeBuffer(forward);
    sideways = removeBuffer(sideways);

    playerApi.current.setAngvel(
      new Vector3(0, -sideways * SPEED_MULTIPLIER.rotate, 0)
    );

    const forwardMultiplier =
      forward > 0 ? SPEED_MULTIPLIER.forward : SPEED_MULTIPLIER.backward;
    const forwardSpeed = forwardMultiplier * forward;
    playerApi.current.setLinvel(
      new Vector3(
        0,
        playerApi.current.linvel().y,
        forwardSpeed
      ).applyQuaternion(playerApi.current.rotation())
    );
    setCharacterState(mapForwardSpeedToplayerState(forwardSpeed));
  });

  return null;
};

export default PlayerMovement;
