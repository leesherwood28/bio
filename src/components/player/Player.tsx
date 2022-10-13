import React, { useEffect } from 'react';
import { Group } from 'three';
import { useGltfWithShadows } from '../../hooks/use-gltf-with-shadows';
import { usePhysicsObject } from '../../hooks/use-physics-object';
import { usePlayerCamera } from '../../hooks/use-player-camera';
import { usePlayerMovement } from '../../hooks/use-player-movement';
import { usePlayerStore } from '../../store/player.store';
import PlayerCharacterStates from './PlayerCharacterStates';

const Player: React.FunctionComponent = () => {
  const playerPhysicsApi = usePhysicsObject<Group>(1);
  const { scene, animations } = useGltfWithShadows('/player/scene.gltf');
  const { setPlayerApi, setPlayerAnimations } = usePlayerStore();

  useEffect(() => {
    setPlayerApi(playerPhysicsApi);
    setPlayerAnimations(animations);
  }, []);

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
        >
          <PlayerCharacterStates />
        </primitive>
      </group>
    </>
  );
};

export default Player;
