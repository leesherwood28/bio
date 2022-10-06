import { useSphere, useRaycastVehicle } from '@react-three/cannon';
import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { BoxGeometry, Group } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { usePhysicsObject } from '../hooks/use-physics-object';
import { usePlayerCamera } from '../hooks/use-player-camera';
import { usePlayerCharacterStates } from '../hooks/use-player-character-states';
import { usePlayerMovement } from '../hooks/use-player-movement';
import {
  CapsuleCollider,
  Debug,
  Physics,
  RigidBody,
  RigidBodyApi,
} from '@react-three/rapier';

const Player: React.FunctionComponent = () => {
  const playerRef = useRef<RigidBodyApi>(null);

  const { scene, animations } = useGLTF(
    '/player/scene.gltf',
    'https://www.gstatic.com/draco/versioned/decoders/1.4.0/'
  ) as GLTF;

  // usePlayerCharacterStates(animations, playerRef);
  // usePlayerCamera(playerRef);
  usePlayerMovement(playerRef);

  return (
    <RigidBody
      ref={playerRef}
      position={[0, 10, 0]}
      colliders={'ball'}
      lockRotations
      args={[]}
      restitution={0}
    >
      <primitive
        object={scene}
        scale={[0.01, 0.01, 0.01]}
        castShadow
        receiveShadow
      ></primitive>
    </RigidBody>
  );
};

export default Player;
