import { AdditiveBlending, BackSide, DoubleSide } from 'three';
import { WORLD_RADIUS } from '../contants/world-radius.const';

const domeVectorShader = `

  varying vec3 vertexPosition;
  uniform float scaler;

  void main() {
    vertexPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const domeFragmentShader = `

  varying vec3 vertexPosition;
  uniform float scaler;

  void main() {
    gl_FragColor = vec4(0, 0.2, 1, 0);
  }
`;

const Dome: React.FunctionComponent = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[WORLD_RADIUS, 64, 64]} />
      {/* <meshPhysicalMaterial
        color={0xffffff}
        transmission={1}
        opacity={1}
        metalness={0}
        roughness={0}
        ior={1.5}
        thickness={0.01}
        specularIntensity={1}
        specularColor={0xffffff}
        envMapIntensity={1}
        lightMapIntensity={1}
        side={DoubleSide}
      /> */}
      {/* <shaderMaterial
        vertexShader={domeVectorShader}
        fragmentShader={domeFragmentShader}
        blending={AdditiveBlending}
        side={DoubleSide}
      /> */}
    </mesh>
  );
};

export default Dome;
