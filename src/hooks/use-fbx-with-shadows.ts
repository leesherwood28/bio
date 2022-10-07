import { useFBX } from '@react-three/drei';
import { useEffect } from 'react';

export function useFbxWithShadows(path: string) {
  const group = useFBX(path);

  useEffect(() => {
    group.traverse((item: any) => {
      if (item.isMesh) {
        item.castShadow = true;
      }
    });
  }, [group]);

  return group;
}
