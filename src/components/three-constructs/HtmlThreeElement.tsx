import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import {
  extend,
  GroupProps,
  Object3DNode,
  Object3DProps,
  ReactThreeFiber,
  useThree,
} from '@react-three/fiber';
import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  NoBlending,
  Object3D,
} from 'three';
import { useEffect, useMemo, useRef, useState, useLayoutEffect } from 'react';
import { createRoot, Root } from 'react-dom/client';

import { isNil } from '../../functions/is-nil.fn';

extend({ CSS3DObject });

interface HtmlThreeElementParams {
  width: number;
  height: number;
  children: React.ReactNode;
}

const HtmlThreeElement: React.FunctionComponent<
  HtmlThreeElementParams & GroupProps
> = ({ width, height, children, ...params }) => {
  const rootEl = useMemo(() => document.createElement('div'), []);
  const root = useMemo(() => createRoot(rootEl), []);

  useEffect(() => {
    root.render(children);
  }, [root, children]);
  // const objectRef = useRef<Object3D<Event>>(null);
  // const { scene } = useThree();

  // useLayoutEffect(() => {
  //   if (isNil(objectRef.current)) {
  //     return;
  //   }

  //   el.style.width = width + 'px';
  //   el.style.height = height + 'px';
  //   const css3d = new CSS3DObject(el);
  //   css3d.scale = new Array(3).fill(1/ 160);
  //   objectRef.current.add(css3d);

  //   const child = document.createElement('div');
  //   el.append(child);
  //   // child.style.transform = 'scale3d(0.00625, 0.00625, 0.00625)';
  //   // // child.style.height = 160 * height + 'px';
  //   // child.style.width = 160 * width + 'px';
  //   // child.style.transformOrigin = 'left top';
  //   root.current = createRoot(child);

  //   return () => {
  //     root.current?.unmount();
  //   };
  // }, [objectRef]);

  return (
    <>
      <group {...params}>
        <cSS3DObject
          args={[rootEl]}
          scale={[1 / 160, 1 / 160, 1 / 160]}
        ></cSS3DObject>

        <mesh>
          <planeGeometry args={[width, height]} />
          <meshPhongMaterial
            color={0x111111}
            blending={NoBlending}
            transparent={true}
            opacity={0.15}
          />
        </mesh>
      </group>
    </>
  );
};

export default HtmlThreeElement;
