import { useTexture } from '@react-three/drei';
import { RepeatWrapping, NearestFilter } from 'three';
import { WORLD } from '../../contants/world.const';
import { CuboidCollider, RigidBody } from '@react-three/rapier';

const GROUND_HEIGHT = 1000;

const Ground: React.FunctionComponent = () => {
  const grassTexture = useTexture('/ground/grass.jpg');
  const tilesTexture = useTexture('/ground/tiles.png');
  grassTexture.wrapS = RepeatWrapping;
  grassTexture.wrapT = RepeatWrapping;
  grassTexture.repeat.set(100, 100);
  grassTexture.magFilter = NearestFilter;

  tilesTexture.wrapS = RepeatWrapping;
  tilesTexture.wrapT = RepeatWrapping;
  tilesTexture.repeat.set(10, 10);
  tilesTexture.magFilter = NearestFilter;

  return (
    <>
      <RigidBody
        position={[0, -GROUND_HEIGHT, 0]}
        friction={0}
        type='fixed'
        colliders={false}
      >
        <CuboidCollider args={[WORLD.radius, GROUND_HEIGHT, WORLD.radius]} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_HEIGHT, 0]}>
          <ringGeometry args={[0, WORLD.centralAreaRadius, 50, 50]} />
          <meshBasicMaterial map={tilesTexture} />
        </mesh>

        {WORLD.foilage && (
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, GROUND_HEIGHT, 0]}
          >
            <ringGeometry
              args={[
                WORLD.foilage.radiusStart,
                WORLD.foilage.radiusEnd,
                50,
                50,
              ]}
            />
            <meshBasicMaterial map={grassTexture} />
          </mesh>
        )}

        {WORLD.outerRim && (
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, GROUND_HEIGHT, 0]}
          >
            <ringGeometry
              args={[
                WORLD.outerRim.radiusStart,
                WORLD.outerRim.radiusEnd,
                50,
                50,
              ]}
            />
            <meshBasicMaterial map={tilesTexture} />
          </mesh>
        )}
        {WORLD.includeShadows && (
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
            position={[0, GROUND_HEIGHT + 0.1, 0]}
          >
            <ringGeometry args={[0, WORLD.radius, 50, 50]} />
            <shadowMaterial color='#171717' opacity={0.5} />
          </mesh>
        )}
      </RigidBody>
    </>
  );
};

export default Ground;
