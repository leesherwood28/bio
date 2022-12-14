import { CylinderCollider, RigidBody } from '@react-three/rapier';
import React from 'react';
import { WORLD } from '../../contants/world.const';
import { useGltf } from '../../hooks/use-gltf';
import { usePlayerStore } from '../../store/player.store';
import PlayerCharacterStates from './PlayerCharacterStates';
import PlayerMovement from './PlayerMovement';

const Player: React.FunctionComponent = () => {
  const { scene, animations } = useGltf('/player/scene.gltf', {
    withShadows: WORLD.includeShadows,
  });
  const playerObjectRef = usePlayerStore((s) => s.playerObjectRef);
  const playerPhysicsRef = usePlayerStore((s) => s.playerApi);
  const isHidden = usePlayerStore((s) => s.isHidden);

  return (
    <>
      <RigidBody
        position={[0, 0, 0]}
        ref={playerPhysicsRef}
        friction={0}
        colliders={false}
        enabledRotations={[false, false, false]}
      >
        <CylinderCollider args={[1, 0.4]} />
        <group position={[0, -1, 0]} ref={playerObjectRef} visible={!isHidden}>
          <primitive
            object={scene}
            rotation={[0, 0, 0]}
            scale={[0.01, 0.01, 0.01]}
            position={[-0.05, 2.83, 0.1]}
            castShadow
            receiveShadow
          >
            <PlayerCharacterStates animations={animations} />
            <PlayerMovement />
          </primitive>
        </group>
      </RigidBody>
    </>
  );
};

export default Player;
