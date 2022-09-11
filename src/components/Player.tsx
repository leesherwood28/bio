import { useGLTF, useAnimations } from '@react-three/drei';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

const Player: React.FunctionComponent = () => {
  const group = useRef();
  const { scene, animations } = useGLTF(
    '/player/scene.gltf',
    'https://www.gstatic.com/draco/versioned/decoders/1.4.0/'
  ) as GLTF;
  const { actions } = useAnimations(animations, group);

  useLayoutEffect(() => {
    actions['Root|Walk']?.play();
  }, [actions]);
  return (
    <group
      ref={group}
      position={[0, 3, 5]}
      scale={[0.01, 0.01, 0.01]}
      rotation={[0, Math.PI, 0]}
    >
      <primitive object={scene} />
    </group>
  );
};

export default Player;
