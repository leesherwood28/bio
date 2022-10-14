import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import {
  extend,
  Object3DNode,
  Object3DProps,
  ReactThreeFiber,
  useThree,
} from '@react-three/fiber';
import { NoBlending, Object3D } from 'three';
import { useEffect, useRef } from 'react';
import { isNil } from '../../functions/is-nil.fn';

extend({ CSS3DObject });

interface HtmlThreeElementParams {
  width: number;
  height: number;
}

const HtmlThreeElement: React.FunctionComponent<
  HtmlThreeElementParams & Object3DProps
> = ({ width, height, ...params }) => {
  const objectRef = useRef<Object3D<Event>>(null);

  const { scene } = useThree();

  useEffect(() => {
    if (isNil(objectRef.current)) {
      return;
    }
    const element = document.createElement('button');
    element.style.width = width + 'px';
    element.style.height = height + 'px';

    element.style.boxSizing = 'border-box';
    element.textContent = 'testing element';
    element.style.transform = 'translate(100px, 100px)';
    element.style.fontSize = '200px';
    const css3d = new CSS3DObject(element);
    objectRef.current.add(css3d);
  }, [objectRef, scene]);

  return (
    <object3D ref={objectRef} {...params}>
      <cSS3DObject attach='css3dObject'></cSS3DObject>

      <mesh>
        {/* <boxGeometry args={[width, height]} /> */}
        <meshBasicMaterial opacity={0.4} transparent color={'white'} />
      </mesh>
    </object3D>
  );
};

export default HtmlThreeElement;
