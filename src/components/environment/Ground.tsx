import { useTexture } from '@react-three/drei';
import { RepeatWrapping, NearestFilter } from 'three';
import { WORLD } from '../../contants/world.const';
import { CuboidCollider, RigidBody } from '@react-three/rapier';

const Ground: React.FunctionComponent = () => {
  const grassTexture = useTexture('/ground/grass.jpg');
  grassTexture.wrapS = RepeatWrapping;
  grassTexture.wrapT = RepeatWrapping;
  grassTexture.repeat.set(100, 100);
  grassTexture.magFilter = NearestFilter;

  console.log('here');
  return (
    <>
      <RigidBody friction={0} type='fixed' colliders={false}>
        <CuboidCollider args={[WORLD.radius, 1, WORLD.radius]} />
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <ringGeometry
            args={[WORLD.foilageRadiusStart, WORLD.foilageRadiusEnd, 50, 50]}
          />
          <meshBasicMaterial map={grassTexture} />
        </mesh>

        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <ringGeometry args={[0, WORLD.centerRadiusEnd, 50, 50]} />
          <meshStandardMaterial color={'gray'} />
        </mesh>

        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <ringGeometry
            args={[WORLD.outerRimRadiusStart, WORLD.outerRimRadiusEnd, 50, 50]}
          />
          <meshStandardMaterial color={'gray'} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Ground;
