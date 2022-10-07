import { useFrame, useLoader } from '@react-three/fiber';
import { createRef } from 'react';
import {
  AdditiveBlending,
  BackSide,
  DoubleSide,
  Mesh,
  MultiplyBlending,
  NormalBlending,
  TextureLoader,
  Vector3,
} from 'three';
import { isNil } from '../functions/is-nil.fn';

const BLACK_HOLE_MOVE_SPEED = 0.1;

const accrectionDiskVectorShader = `

  varying vec3 vertexPosition;
  uniform float scaler;

  void main() {
    vertexPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const accretionDiskFragmentShader = `

  varying vec3 vertexPosition;
  uniform float scaler;

  void main() {
    float distanceFromCenter = length(vertexPosition);
    float intensity = (1.0 - scaler * length(vertexPosition));
    float colorIntensity = intensity * 3.5;
    float intensityFluctuation = sin(100.0 * intensity) * 0.005 / intensity;
    float totalIntensity = colorIntensity + intensityFluctuation;
    vec4 color = vec4(1, 0.6, 0, 1) * totalIntensity;
    float randomColorIntensity = sin(50.0 * intensity) * 0.01;
    vec4 randColorAdd = vec4(randomColorIntensity, randomColorIntensity, 0, 1);
    vec4 extraColorAdd = 0.03 * vec4(1, 1, 1, 0) * sin(vertexPosition.x * 5.0) * sin(vertexPosition.y * 5.0);

    gl_FragColor = color + randColorAdd + extraColorAdd;
  }
`;

const BLACK_HOLE_POSITION = new Vector3(10, 200, 900);

const BlackHole: React.FunctionComponent = () => {
  const accretionRef = createRef<Mesh>();
  const accretionRefTwo = createRef<Mesh>();
  const planetTexture = useLoader(TextureLoader, 'jupiter/jupiter.jpg');

  planetTexture.anisotropy = 16;

  useFrame((state, time) => {
    if (isNil(accretionRef.current) || isNil(accretionRefTwo.current)) {
      return;
    }
    accretionRef.current.rotateOnWorldAxis(
      new Vector3(0, 0, 1),
      -time * BLACK_HOLE_MOVE_SPEED
    );
    accretionRefTwo.current.rotateOnWorldAxis(
      new Vector3(0, 1, 0),
      time * BLACK_HOLE_MOVE_SPEED
    );
  });
  const blackHoleScale = 50;
  const blackHoleVectorScale = new Vector3(
    blackHoleScale,
    blackHoleScale,
    blackHoleScale
  );

  return (
    <>
      <directionalLight
        position={BLACK_HOLE_POSITION}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-mapType={PCFSoftShadowMap}
      >
        <orthographicCamera attach='shadow-camera' args={[-25, 25, 6, -5]} />
      </directionalLight>

      <group
        position={BLACK_HOLE_POSITION}
        rotation={[-Math.PI / 10, 0, Math.PI / 7]}
        scale={blackHoleVectorScale}
      >
        <mesh>
          <sphereGeometry args={[4, 48, 48]} />
          <meshBasicMaterial color={'Black'} />
        </mesh>
        <mesh scale={1.005}>
          <sphereGeometry args={[4, 48, 48]} />
          <meshBasicMaterial
            blending={AdditiveBlending}
            color={[1, 0.6, 0]}
            side={BackSide}
          ></meshBasicMaterial>
        </mesh>
        <mesh ref={accretionRef}>
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
        <mesh ref={accretionRefTwo} rotation={[Math.PI / 2, 0, 0]}>
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
    </>
  );
};

export default BlackHole;
