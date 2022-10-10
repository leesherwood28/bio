import { useTexture } from '@react-three/drei';
import { extend, Object3DNode, ReactThreeFiber } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';
import { isNil } from '../functions/is-nil.fn';

extend({ Lensflare, LensflareElement });

declare module '@react-three/fiber' {
  interface ThreeElements {
    lensflare: Object3DNode<Lensflare, typeof Lensflare>;
    lensflareElement: Object3DNode<LensflareElement, typeof LensflareElement>;
  }
}

export const LensFlare: React.FunctionComponent = () => {
  const ref = useRef<Lensflare>(null);
  const lensflare0 = useTexture('/lensflare/lensflare0.png');
  const lensflare1 = useTexture('/lensflare/lensflare1.png');
  const lensflare2 = useTexture('/lensflare/lensflare2.png');
  const lensflare3 = useTexture('/lensflare/lensflare3.png');

  useEffect(() => {
    if (isNil(ref.current)) {
      return;
    }

    ref.current.addElement(new LensflareElement(lensflare0, 700, 0));
    ref.current.addElement(new LensflareElement(lensflare3, 60, 0.6));
    ref.current.addElement(new LensflareElement(lensflare3, 70, 0.7));
    ref.current.addElement(new LensflareElement(lensflare3, 120, 0.9));
    ref.current.addElement(new LensflareElement(lensflare3, 70, 1));
  }, [ref]);

  return (
    <>
      <lensflare position={[0, 2, 0]} ref={ref}></lensflare>
    </>
  );
};

export default LensFlare;
