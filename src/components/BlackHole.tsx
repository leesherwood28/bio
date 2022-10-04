import { useFrame, useLoader } from '@react-three/fiber';
import { createRef } from 'react';
import {
  AdditiveBlending,
  BackSide,
  DoubleSide,
  Mesh,
  TextureLoader,
  Vector3,
} from 'three';
import { isNil } from '../functions/is-nil.fn';

const BLACK_HOLE_MOVE_SPEED = 0.01;

const accrectionDiskVectorShader = `

  varying vec3 vertexNormal;
  varying vec3 vertexPosition;

  varying vec2 vertexUV;

  void main() {
    vertexUV = uv;
    vertexPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }

`;

const accretionDiskFragmentShader = `

  varying vec2 vertexUV;
  varying vec3 vertexPosition;
  uniform float scaler;

  void main() {
    float distanceFromCenter = length(vertexPosition);
    float intensity = (1.0 - scaler * length(vertexPosition));
    float colorIntensity = intensity * 3.5;
    float intensityFluctuation = sin(100.0 * intensity) * 0.005 / intensity;
    float totalIntensity = colorIntensity + intensityFluctuation;
    gl_FragColor = vec4(1, 0.6, 0, 1) * totalIntensity;
  }
`;

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
      <mesh>
        <ringGeometry args={[10, 5, 64]} />
        <shaderMaterial
          fragmentShader={accretionDiskFragmentShader}
          vertexShader={accrectionDiskVectorShader}
          blending={AdditiveBlending}
          side={DoubleSide}
          uniforms={{
            scaler: { value: 0.1 },
          }}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[10, 5, 64]} />
        <shaderMaterial
          fragmentShader={accretionDiskFragmentShader}
          vertexShader={accrectionDiskVectorShader}
          blending={AdditiveBlending}
          side={DoubleSide}
          uniforms={{
            scaler: { value: 0.1 },
          }}
        />
      </mesh>
    </group>
  );
};

export default BlackHole;
