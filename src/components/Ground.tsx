import { useTexture } from '@react-three/drei';
import { RepeatWrapping, NearestFilter } from 'three';
import { WORLD } from '../contants/world.const';

const Ground: React.FunctionComponent = () => {
  const grassTexture = useTexture('/ground/grass.jpg');

  grassTexture.wrapS = RepeatWrapping;
  grassTexture.wrapT = RepeatWrapping;
  grassTexture.repeat.set(100, 100);
  grassTexture.magFilter = NearestFilter;
  return (
    <>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry
          args={[WORLD.foilageRadiusStart, WORLD.foilageRadiusEnd, 50, 50]}
        />
        <meshBasicMaterial map={grassTexture} />
      </mesh>

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[0, WORLD.centerRadiusEnd, 50, 50]} />
        <meshStandardMaterial color={'gray'} />
      </mesh>

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry
          args={[WORLD.outerRimRadiusStart, WORLD.outerRimRadiusEnd, 50, 50]}
        />
        <meshStandardMaterial color={'gray'} />
      </mesh>
    </>
  );
};

export default Ground;
