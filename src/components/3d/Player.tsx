import React from 'react';
import { Group } from 'three';
import { useGltfWithShadows } from '../hooks/use-gltf-with-shadows';
import { usePhysicsObject } from '../hooks/use-physics-object';
import { usePlayerCamera } from '../hooks/use-player-camera';
import { usePlayerCharacterStates } from '../hooks/use-player-character-states';
import { usePlayerMovement } from '../hooks/use-player-movement';

const Player: React.FunctionComponent = () => {
  const playerPhysicsApi = usePhysicsObject<Group>(1);

  const { scene, animations } = useGltfWithShadows('/player/scene.gltf');

  usePlayerCharacterStates(animations, playerPhysicsApi);
  usePlayerCamera(playerPhysicsApi);
  usePlayerMovement(playerPhysicsApi);

  return (
    <>
      <group ref={playerPhysicsApi.objectRef} position={[0, 0, 0]}>
        <primitive
          object={scene}
          rotation={[0, 0, 0]}
          scale={[0.01, 0.01, 0.01]}
          position={[-0.05, 2.83, 0.1]}
          castShadow
          receiveShadow
        ></primitive>
      </group>
    </>
  );
};

export default Player;
