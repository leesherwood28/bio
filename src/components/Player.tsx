import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Group } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

const Player: React.FunctionComponent = () => {
  const playerRef = useRef<Group>(null);
  const { scene, animations } = useGLTF(
    '/player/scene.gltf',
    'https://www.gstatic.com/draco/versioned/decoders/1.4.0/'
  ) as GLTF;
  const { actions } = useAnimations(animations, playerRef);

  useLayoutEffect(() => {
    actions['Root|Walk']?.play();
  }, [actions]);

  useFrame(() => {
    if (!playerRef.current) {
      return;
    }
    playerRef.current.position.z -= 0.01;
  });

  return (
    <group
      ref={playerRef}
      position={[0, 3, 5]}
      scale={[0.01, 0.01, 0.01]}
      rotation={[0, Math.PI, 0]}
    >
      <primitive object={scene} />
    </group>
  );
};

export default Player;
