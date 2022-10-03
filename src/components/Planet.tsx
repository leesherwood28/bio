import { useFrame, useLoader } from '@react-three/fiber';
import { createRef, useRef } from 'react';
import {
  FrontSide,
  DoubleSide,
  GLSL1,
  GLSL3,
  Mesh,
  Vector3,
  TextureLoader,
} from 'three';
import { isNil } from '../functions/is-nil.fn';

const PLANET_MOVE_SPEED = 0.01;

const Planet: React.FunctionComponent = () => {
  const planetRef = createRef<Mesh>();
  const planetTexture = useLoader(
    TextureLoader,
    'https://i.ibb.co/h94JBXy/saturn3-ljge5g.jpg'
  );

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
      <mesh ref={planetRef} position={[1500, -100, 0]}>
        <sphereGeometry args={[900, 48, 48]} />
        <meshLambertMaterial map={planetTexture} fog={false} />
      </mesh>
    </>
  );
};

export default Planet;
