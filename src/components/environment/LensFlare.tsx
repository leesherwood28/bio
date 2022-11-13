import { useTexture } from '@react-three/drei';
import { extend, Object3DNode, ReactThreeFiber } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';
import { isNil } from '../../functions/is-nil.fn';

extend({ Lensflare, LensflareElement });

export interface LensFlareArguments {
  position: ReactThreeFiber.Vector3;
}

export const LensFlare: React.FunctionComponent<LensFlareArguments> = ({
  position,
}) => {
  const ref = useRef<Lensflare>(null);
  const lensflare3 = useTexture('/lensflare/lensflare3.png');

  useEffect(() => {
    if (isNil(ref.current)) {
      return;
    }

    ref.current.addElement(new LensflareElement(lensflare3, 60, 0.6));
    ref.current.addElement(new LensflareElement(lensflare3, 70, 0.7));
    ref.current.addElement(new LensflareElement(lensflare3, 120, 0.9));
    ref.current.addElement(new LensflareElement(lensflare3, 70, 1));
  }, [ref, lensflare3]);

  return (
    <>
      <lensflare ref={ref} position={position}></lensflare>
    </>
  );
};

export default LensFlare;
