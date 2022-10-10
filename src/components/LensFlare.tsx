import { useTexture } from '@react-three/drei';
import { extend, ReactThreeFiber } from '@react-three/fiber';
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';

extend({ Lensflare, LensflareElement });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      lensflare: ReactThreeFiber.Object3DNode<Lensflare, typeof Lensflare>;
      lensflareElement: ReactThreeFiber.Object3DNode<
        LensflareElement,
        typeof LensflareElement
      >;
    }
  }
}

export const LensFlare: React.FunctionComponent = () => {
  const lensflare0 = useTexture('/lensflare/lensflare0.png');
  const lensflare1 = useTexture('/lensflare/lensflare1.png');
  const lensflare2 = useTexture('/lensflare/lensflare2.png');
  const lensflare3 = useTexture('/lensflare/lensflare3.png');
  return (
    <lensflare>
      <lensflareElement args={[lensflare0, 512, 0]} />
      <lensflareElement args={[lensflare1, 512, 0]} />
      <lensflareElement args={[lensflare2, 60, 0.6]} />
    </lensflare>
  );
};

export default LensFlare;
