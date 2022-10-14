import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import {
  extend,
  Object3DNode,
  Object3DProps,
  ReactThreeFiber,
} from '@react-three/fiber';
import { NoBlending } from 'three';

extend({ CSS3DObject });

interface HtmlThreeElementParams {
  width: number;
  height: number;
}

const HtmlThreeElement: React.FunctionComponent<
  HtmlThreeElementParams & Object3DProps
> = ({ width, height, ...params }) => {
  const element = document.createElement('button');
  element.style.width = width + 'px';
  element.style.height = height + 'px';
  element.style.opacity = '0.999';
  element.style.boxSizing = 'border-box';
  element.textContent = 'testing';

  return (
    <object3D {...params}>
      <cSS3DObject element={element}></cSS3DObject>

      <mesh>
        <boxGeometry args={[width, height]} />
        <meshPhongMaterial
          opacity={0.15}
          blending={NoBlending}
          color={'white'}
        />
      </mesh>
    </object3D>
  );
};

export default HtmlThreeElement;
