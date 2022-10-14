import { extend, Object3DNode, ReactThreeFiber } from '@react-three/fiber';
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

declare module '@react-three/fiber' {
  interface ThreeElements {
    lensflare: Object3DNode<Lensflare, typeof Lensflare>;
    lensflareElement: Object3DNode<LensflareElement, typeof LensflareElement>;
    css3DObject: Object3DNode<CSS3DObject, typeof CSS3DObject>;
  }
}
