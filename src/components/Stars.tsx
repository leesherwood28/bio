import { useCubeTexture } from '@react-three/drei';
import { BackSide, sRGBEncoding } from 'three';

const _SKY_VS = `
varying vec3 vWorldPosition;

void main() {
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  vWorldPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`;

const _SKY_FS = `
uniform samplerCube background;

varying vec3 vWorldPosition;

void main() {
  vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
  vec3 stars = textureCube(background, viewDirection).xyz;

  gl_FragColor = vec4(stars, 1.0);
}`;

export function Stars() {
  const envMap = useCubeTexture(
    [
      'space-posx.jpg',
      'space-negx.jpg',
      'space-posy.jpg',
      'space-negy.jpg',
      'space-posz.jpg',
      'space-negz.jpg',
    ],
    { path: 'space/' }
  );
  envMap.encoding = sRGBEncoding;

  return (
    <mesh>
      <sphereBufferGeometry args={[2500, 0, 0]} />
      <shaderMaterial
        uniforms={{ background: { value: envMap } }}
        side={BackSide}
        fragmentShader={_SKY_FS}
        vertexShader={_SKY_VS}
      />
    </mesh>
  );
}
