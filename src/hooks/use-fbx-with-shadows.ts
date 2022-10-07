import { useFBX } from '@react-three/drei';
import { useEffect } from 'react';

export function useFbxWithShadows(path: string) {
  const group = useFBX(path);
  group.traverse((item: any) => {
    if (item.isMesh) {
      item.castShadow = true;
      item.receiveShadow = true;
      item.needsUpdate = true;
    }
  });

  return group;
}
