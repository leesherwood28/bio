import { useGLTF } from '@react-three/drei';
import React from 'react';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

const Player: React.FunctionComponent = () => {
  const { scene } = useGLTF('/player/scene.gltf') as GLTF;
  return <primitive object={scene} />;
};

export default Player;
