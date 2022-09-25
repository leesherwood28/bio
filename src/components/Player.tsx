import { useSphere, useRaycastVehicle } from '@react-three/cannon';
import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import React from 'react';
import { Group } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { usePlayerCamera } from '../hooks/use-player-camera';
import { usePlayerCharacterStates } from '../hooks/use-player-character-states';
import { usePlayerMovement } from '../hooks/use-player-movement';

const Player: React.FunctionComponent = () => {
  const [playerRef, api] = useSphere<Group>(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 1, 0],
    angularFactor: [0, 1, 0],
  }));

  const { scene, animations } = useGLTF(
    '/player/scene.gltf',
    'https://www.gstatic.com/draco/versioned/decoders/1.4.0/'
  ) as GLTF;

  usePlayerCharacterStates(animations, playerRef);
  usePlayerCamera(api);
  usePlayerMovement(api);

  return (
    <>
      <group ref={playerRef}>
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
