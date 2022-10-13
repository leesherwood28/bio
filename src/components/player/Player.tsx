import React, { useEffect } from 'react';
import { Group } from 'three';
import { useGltfWithShadows } from '../../hooks/use-gltf-with-shadows';
import { usePhysicsObject } from '../../hooks/use-physics-object';
import { usePlayerCamera } from '../../hooks/use-player-camera';
import { usePlayerStore } from '../../store/player.store';
import PlayerCharacterStates from './PlayerCharacterStates';
import PlayerMovement from './PlayerMovement';

const Player: React.FunctionComponent = () => {
  const playerPhysicsApi = usePhysicsObject<Group>(1);
  const { scene, animations } = useGltfWithShadows('/player/scene.gltf');
  const setPlayerApi = usePlayerStore((s) => s.setPlayerApi);
  const setPlayerAnimations = usePlayerStore((s) => s.setPlayerAnimations);

  setPlayerApi(playerPhysicsApi);
  setPlayerAnimations(animations);

  usePlayerCamera(playerPhysicsApi);
  // usePlayerMovement(playerPhysicsApi);

  console.count('render');

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
        >
          <PlayerCharacterStates />
          <PlayerMovement />
        </primitive>
      </group>
    </>
  );
};

export default Player;
