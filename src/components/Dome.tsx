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

const Dome: React.FunctionComponent = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[WORLD_RADIUS, 64, 64]} />
      <shaderMaterial
        vertexShader={domeVectorShader}
        fragmentShader={domeFragmentShader}
        blending={AdditiveBlending}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Dome;
