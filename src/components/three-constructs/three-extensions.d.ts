import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';

declare module '@react-three/fiber' {
  interface ThreeElements {
    lensflare: Object3DNode<Lensflare, typeof Lensflare>;
    lensflareElement: Object3DNode<LensflareElement, typeof LensflareElement>;
  }
}
