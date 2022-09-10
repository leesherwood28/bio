import * as THREE from 'three';

const Ground: React.FunctionComponent = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[50, 50]} />
      <meshStandardMaterial color='green' />
    </mesh>
  );
};

export default Ground;
