import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { AdditiveBlending, BackSide, DoubleSide } from 'three';
import { WORLD_RADIUS } from '../contants/world-radius.const';
import { isNil } from '../functions/is-nil.fn';

const domeVectorShader = `

  varying vec3 vertexPosition;
  varying vec3 vertexNormal;
  varying vec3 vertexWorldPosition;
  varying vec2 vertexUV;

  uniform float scaler;

  void main() {
    vertexPosition = position;
    vertexNormal = normal;
    vertexWorldPosition = (modelMatrix * vec4( position, 1.0 )).xyz;
    vertexUV = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const domeFragmentShader = `

  varying vec3 vertexPosition;
  varying vec3 vertexNormal;
  varying vec3 vertexWorldPosition;
  varying vec2 vertexUV;

  uniform sampler2D sheildTexture;
  uniform float time;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vertexWorldPosition);
    vec3 normal = normalize(vertexNormal);
    float sheildBars = texture2D(sheildTexture, vertexUV).a;
    float timeDisturbance = time / 2000.0;
    float sheildNoise = sin(10.0 * vertexUV.x + timeDisturbance) * sin(10.0 * vertexUV.y + timeDisturbance);
    float sheildAlpha =  sheildBars * (sheildNoise * sheildNoise + 0.25);
    gl_FragColor = vec4(0.0, 0.2, 1.0, sheildAlpha);
  }
`;

const Sheild: React.FunctionComponent = () => {
  const texture = useTexture('/sheild/sheild.png');
  const textureRef = useRef<THREE.ShaderMaterial>(null);

  const now = performance.now();

  useFrame(() => {
    if (isNil(textureRef.current)) {
      return;
    }
    textureRef.current.uniforms.time = { value: performance.now() };
  });

  return (
    <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry args={[WORLD_RADIUS, 64, 64]} />
      {/* <meshStandardMaterial color={'blue'} side={DoubleSide} /> */}
      {/* <meshBasicMaterial color={'blue'} side={DoubleSide} /> */}
      {/* <meshBasicMaterial
        map={texture}
        color={'blue'}
        side={DoubleSide}
        transparent={true}
      /> */}

      <shaderMaterial
        ref={textureRef}
        vertexShader={domeVectorShader}
        fragmentShader={domeFragmentShader}
        blending={AdditiveBlending}
        side={DoubleSide}
        transparent={true}
        uniforms={{
          sheildTexture: { value: texture },
          time: { value: now },
        }}
      />
    </mesh>
  );
};

export default Sheild;
