import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { extend, Object3DNode, ReactThreeFiber } from '@react-three/fiber';

extend({ CSS3DObject });

declare module '@react-three/fiber' {
  interface ThreeElements {
    css3DObject: Object3DNode<CSS3DObject, typeof CSS3DObject>;
  }
}

const HtmlThreeElement: React.FunctionComponent = () => {
  return (
    <object3D>
      <css3DObject></css3DObject>
    </object3D>
  );
};

export default HtmlThreeElement;
