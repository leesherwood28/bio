import { extend, GroupProps, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { NoBlending } from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { isNil } from '../../functions/is-nil.fn';

extend({ CSS3DObject });

interface HtmlThreeElementParams {
  children: React.ReactNode;
  scaler?: number;
}

const HtmlThreeElement: React.FunctionComponent<
  HtmlThreeElementParams & GroupProps
> = ({ children, scaler = 160, ...params }) => {
  const { gl } = useThree();

  const rootEl = useMemo(() => document.createElement('div'), []);
  const root = useMemo(() => createRoot(rootEl), [rootEl]);
  const [{ width, height }, setWidthHeight] = useState({ width: 0, height: 0 });
  const resizeObserver = useMemo(() => {
    return new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      // Remove single pixel to ensure complete overlap
      // of rendered element to the mesh
      setWidthHeight({ width: width - 1, height: height - 1 });
    });
  }, []);

  const setGLPointer = useCallback(
    (value: string) => {
      const parent = gl.domElement.parentElement?.parentElement;
      if (isNil(parent)) {
        return;
      }
      parent.style.pointerEvents = value;
    },
    [gl]
  );

  useEffect(() => {
    root.render(children);
    resizeObserver.observe(rootEl);
    return () => resizeObserver.unobserve(rootEl);
  }, [root, children, rootEl, resizeObserver]);

  return (
    <>
      <group {...params}>
        <cSS3DObject
          args={[rootEl]}
          scale={[1 / scaler, 1 / scaler, 1 / scaler]}
        ></cSS3DObject>

        <mesh
          onPointerMove={(...args) => {
            setTimeout(() => setGLPointer('none'), 0);
          }}
          scale={[width / scaler, height / scaler, 1]}
        >
          <planeGeometry />
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
