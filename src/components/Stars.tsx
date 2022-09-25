import { useRef, useState } from 'react';
import * as maath from 'maath';
import { PointMaterial, Points } from '@react-three/drei';

function Stars() {
  const ref = useRef<any>();
  const [sphere] = useState(() =>
    maath.random.inSphere(new Float32Array(5000), { radius: 1.5 })
  );
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere as any}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color='#ffa0e0'
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
