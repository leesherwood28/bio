import { useFBX } from '@react-three/drei';

export function useFbx(path: string, { useShadows }: { useShadows: boolean }) {
  const group = useFBX(path);
  if (useShadows) {
    group.traverse((item: any) => {
      if (item.isMesh) {
        item.castShadow = useShadows;
        item.receiveShadow = useShadows;
        item.needsUpdate = true;
      }
    });
  }

  return group;
}
