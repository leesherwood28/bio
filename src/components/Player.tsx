import { useSphere, useRaycastVehicle } from '@react-three/cannon';
import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import React from 'react';
import { Group } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { usePhysicsObject } from '../hooks/use-physics-object';
import { usePlayerCamera } from '../hooks/use-player-camera';
import { usePlayerCharacterStates } from '../hooks/use-player-character-states';
import { usePlayerMovement } from '../hooks/use-player-movement';

const Player: React.FunctionComponent = () => {
  const [playerRef, playerPhysicsApi] = usePhysicsObject<Group>();

  const { scene, animations } = useGLTF(
    '/player/scene.gltf',
    'https://www.gstatic.com/draco/versioned/decoders/1.4.0/'
  ) as GLTF;

  usePlayerCharacterStates(animations, playerRef);
  // usePlayerCamera(api);
  usePlayerMovement(playerPhysicsApi, playerRef);

  return (
    <>
      <group ref={playerRef} position={[0, 1, 0]}>
        <primitive
          object={scene}
          rotation={[0, 0, 0]}
          scale={[0.01, 0.01, 0.01]}
          position={[-0.05, 1.85, 0.1]}
          castShadow
          receiveShadow
        ></primitive>
      </group>
    </>
  );
};

export default Player;
