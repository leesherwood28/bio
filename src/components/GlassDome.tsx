import { useCubeTexture } from '@react-three/drei';
import {
  AdditiveBlending,
  BackSide,
  MeshPhysicalMaterial,
  sRGBEncoding,
} from 'three';

export function GlassDome() {
  return (
    <mesh position={[0, 1, 0]}>
      <sphereGeometry args={[50, 20, 20]} />
    </mesh>
  );
}
