import { WORLD_RADIUS } from '../contants/world-radius.const';

const Ground: React.FunctionComponent = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <circleGeometry args={[WORLD_RADIUS, 50, 50]} />
      <meshStandardMaterial color='#146600' />
    </mesh>
  );
};

export default Ground;
