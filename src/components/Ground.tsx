import { RigidBody } from '@react-three/rapier';

const Ground: React.FunctionComponent = () => {
  return (
    <RigidBody
      type='fixed'
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
    >
      <mesh receiveShadow>
        <planeBufferGeometry args={[100, 100]} />
        <shadowMaterial color='#171717' />
        <meshStandardMaterial color='green' />
      </mesh>
    </RigidBody>
  );
};

export default Ground;
