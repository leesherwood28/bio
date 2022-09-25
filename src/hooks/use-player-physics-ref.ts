import { PublicApi } from '@react-three/cannon';
import { useEffect, useRef } from 'react';
import { PlayerPhysicsData } from '../models/player-physics-data.model';

export const usePlayerPhysicsRef = (api: PublicApi) => {
  const data = useRef<PlayerPhysicsData>({
    velocity: [0, 0, 0],
    angularVelocity: [0, 0, 0],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  });

  useEffect(() => {
    api.velocity.subscribe(
      (v) => (data.current = { ...data.current, velocity: v })
    );
  }, [api.velocity]);

  useEffect(() => {
    api.angularVelocity.subscribe(
      (v) => (data.current = { ...data.current, angularVelocity: v })
    );
  });

  useEffect(() => {
    api.rotation.subscribe(
      (v) => (data.current = { ...data.current, rotation: v })
    );
  }, [api.rotation]);

  useEffect(() => {
    api.position.subscribe(
      (v) => (data.current = { ...data.current, position: v })
    );
  });

  return data;
};
