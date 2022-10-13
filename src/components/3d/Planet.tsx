import { useFrame, useLoader } from '@react-three/fiber';
import { createRef } from 'react';
import { Mesh, TextureLoader, Vector3 } from 'three';
import { isNil } from '../../functions/is-nil.fn';

const PLANET_MOVE_SPEED = 0.01;

const Planet: React.FunctionComponent = () => {
  const planetRef = createRef<Mesh>();
  const planetTexture = useLoader(TextureLoader, 'jupiter/jupiter.jpg');

  planetTexture.anisotropy = 16;

  useFrame((state, time) => {
    if (isNil(planetRef.current)) {
      return;
    }
    planetRef.current.rotateOnWorldAxis(
      new Vector3(0, 1, 0),
      time * PLANET_MOVE_SPEED
    );
  });

  return (
    <>
      <mesh ref={planetRef} position={[1500, 200, 0]}>
        <sphereGeometry args={[500, 96, 96]} />
        <meshLambertMaterial map={planetTexture} />
      </mesh>
    </>
  );
};

export default Planet;
