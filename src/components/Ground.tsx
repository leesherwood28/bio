import { useTexture } from '@react-three/drei';
import { WORLD_RADIUS } from '../contants/world-radius.const';
import { RepeatWrapping, NearestFilter } from 'three';

const Ground: React.FunctionComponent = () => {
  const grassTexture = useTexture('/ground/grass.jpg');

  grassTexture.wrapS = RepeatWrapping;
  grassTexture.wrapT = RepeatWrapping;
  grassTexture.repeat.set(100, 100);
  grassTexture.magFilter = NearestFilter;
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <circleGeometry args={[WORLD_RADIUS, 50, 50]} />
      <meshBasicMaterial map={grassTexture} />
    </mesh>
  );
};

export default Ground;
