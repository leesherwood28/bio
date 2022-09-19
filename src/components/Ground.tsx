import { usePlane } from '@react-three/cannon';
import { Mesh } from 'three';

const Ground: React.FunctionComponent = () => {
  const [planeRef] = usePlane<Mesh>(() => ({ rotation: [-Math.PI / 2, 0, 0] }));

  return (
    <mesh ref={planeRef} receiveShadow>
      <planeBufferGeometry args={[1000, 1000]} />
      <shadowMaterial color='#171717' transparent opacity={0.4} />
      <meshStandardMaterial color='green' />
    </mesh>
  );
};

export default Ground;
