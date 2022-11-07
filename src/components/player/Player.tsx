import React, { useEffect, useRef } from 'react';
import { Group } from 'three';
import { useGltfWithShadows } from '../../hooks/use-gltf-with-shadows';
import { usePhysicsObject } from '../../hooks/use-physics-object';
import { usePlayerStore } from '../../store/player.store';
import PlayerCharacterStates from './PlayerCharacterStates';
import PlayerMovement from './PlayerMovement';
import { RigidBody, RigidBodyApi } from '@react-three/rapier';

const Player: React.FunctionComponent = () => {
  const { scene, animations } = useGltfWithShadows('/player/scene.gltf');
  const playerObjectRef = usePlayerStore((s) => s.playerObjectRef);
  const playerPhysicsRef = usePlayerStore((s) => s.playerApi);
  const setPlayerAnimations = usePlayerStore((s) => s.setPlayerAnimations);
  const isHidden = usePlayerStore((s) => s.isHidden);

  setPlayerAnimations(animations);

  return (
    <>
      <RigidBody ref={playerPhysicsRef}>
        <group ref={playerObjectRef} position={[0, 0, 0]}>
          <primitive
            object={scene}
            rotation={[0, 0, 0]}
            scale={[0.01, 0.01, 0.01]}
            position={[-0.05, 2.83, 0.1]}
            castShadow
            receiveShadow
            transparent={isHidden}
            opacity={isHidden ? 0 : 1}
          >
            <PlayerCharacterStates />
            <PlayerMovement />
          </primitive>
        </group>
      </RigidBody>
    </>
  );
};

export default Player;
