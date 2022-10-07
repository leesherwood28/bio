import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export function useGltfWithShadows(path: string) {
  const gltf = useGLTF(path);

  gltf.scene.traverse((item: any) => {
    if (item.isMesh) {
      item.castShadow = true;
      item.receiveShadow = true;
      item.needsUpdate = true;
    }
  });
  return gltf;
}
