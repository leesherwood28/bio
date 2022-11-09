import { useGLTF } from '@react-three/drei';

export function useGltf(
  path: string,
  { withShadows }: { withShadows: boolean }
) {
  const gltf = useGLTF(path);
  if (withShadows) {
    gltf.scene.traverse((item: any) => {
      if (item.isMesh) {
        item.castShadow = true;
        item.receiveShadow = true;
        item.needsUpdate = true;
      }
    });
  }

  return gltf;
}
