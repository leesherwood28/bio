import { useVideoTexture } from '@react-three/drei';
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
  AdditiveBlending,
  BackSide,
} from 'three';
import { isNil } from '../functions/is-nil.fn';

const vertexShader = `

  varying vec3 vertexNormal;
  varying vec3 vertexPosition;
  varying vec3 vWorldPosition;

  void main() {

    vertexNormal = normalize(normalMatrix * normal);

    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
    vWorldPosition = worldPosition.xyz;
  
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vertexPosition = gl_Position.xyz;
  }

`;

const fragmentShader = `

  varying vec3 vertexNormal;
  varying vec3 vertexPosition;
  varying vec3 vWorldPosition;

  void main() {
    vec3 viewDirection = normalize(vWorldPosition - cameraPosition);

    float intensity = pow(0.5 - dot(viewDirection, vertexNormal), 2.0);

    // gl_FragColor = vec4(1, 1, 0, 1) * intensity;
     gl_FragColor =  vec4(viewDirection, 1);
    
  }
`;

const BLACK_HOLE_MOVE_SPEED = 0.01;

const BlackHole: React.FunctionComponent = () => {
  const planetRef = createRef<Mesh>();
  const planetTexture = useLoader(TextureLoader, 'jupiter/jupiter.jpg');

  planetTexture.anisotropy = 16;

  useFrame((state, time) => {
    if (isNil(planetRef.current)) {
      return;
    }
    planetRef.current.rotateOnWorldAxis(
      new Vector3(0, 1, 0),
      time * BLACK_HOLE_MOVE_SPEED
    );
  });

  return (
    <group position={[0, 5, 10]}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[4, 48, 48]} />
        <meshBasicMaterial color={'Black'} />
      </mesh>
      <mesh scale={1.5}>
        <sphereGeometry args={[4, 48, 48]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          blending={AdditiveBlending}
          side={BackSide}
        />
      </mesh>
    </group>
  );
};

export default BlackHole;
