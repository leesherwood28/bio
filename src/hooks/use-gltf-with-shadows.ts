import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export function useGltfWithShadows(path: string) {
  const gltf = useGLTF(path);

  useEffect(() => {
    const { scene } = gltf;
    scene.traverse((item: any) => {
      if (item.isMesh) {
        item.castShadow = true;
      }
    });
  }, [gltf]);

  return gltf;
}
