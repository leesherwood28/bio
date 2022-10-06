import { useFBX, useGLTF, useTexture } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useEffect } from 'react';
import {
  AdditiveBlending,
  DoubleSide,
  MaterialLoader,
  ObjectLoader,
  ShaderChunk,
  Texture,
} from 'three';
import * as maath from 'maath';

const MODELS = [];

const TEXTURES = [
  'BirchTree_Bark_Normal',
  'BirchTree_Bark',
  'BirchTree_Leaves',
  'Flowers',
  'Grass',
  'Leaves_BW',
  'MapleTree_Bark_Normal',
  'MapleTree_Bark',
  'MapleTree_Leaves_BW',
  'MapleTree_Leaves',
  'NormalTree_Bark_Normal',
  'NormalTree_Bark',
  'NormalTree_Leaves',
  'PalmTree_Leaves',
  'PalmTree_Trunk_Normal',
  'PalmTree_Trunk',
  'PineTree_Bark_Normal',
  'PineTree_Bark',
  'PineTree_Leaves',
  'Rocks',
];

const NORMALS = [
  'BirchTree_Bark',
  'MapleTree_Bark',
  'NormalTree_Bark',
  'PalmTree_Trunk',
  'PineTree_Bark',
];

// Models used with love from https://quaternius.com/;

const useTexturesMap = (
  textures: string[],
  pathFn: (t: string) => string
): Map<string, Texture> => {
  const loadedTextures = useTexture(textures.map((t) => pathFn(t)));
  const map = new Map<string, Texture>();
  for (let i = 0; i < textures.length; i++) {
    map.set(textures[i], loadedTextures[i]);
  }
  return map;
};

const Trees: React.FunctionComponent = () => {
  const fbx = useFBX('/foilage/BirchTree_1.fbx');
  return <primitive scale={0.025} object={fbx} />;

  const { scene, nodes, materials } = useGLTF(
    '/foilage/BirchTree_1.gltf'
  ) as any;

  //   const materials = useLoader(MTLLoader, '/foilage/BirchTree_1.mtl');
  //   const object = useLoader(OBJLoader, '/foilage/BirchTree_1.obj', (loader) => {
  //     materials.preload();
  //     (loader as any).setMaterials(materials);
  //   }) as any;

  const textures = useTexturesMap(
    TEXTURES,
    (t) => `/foilage/textures/${t}.png`
  );
  const normals = useTexturesMap(
    NORMALS,
    (t) => `/foilage/textures/${t}_Normal.png`
  );

  useEffect(() => {
    scene.traverse((t: any) => {
      if (!t.isMesh) {
        return;
      }
      t.side = DoubleSide;
      t.material.side = DoubleSide;
      t.material.transparent = true;

      if (textures.has(t.material.name)) {
        t.material.map = textures.get(t.material.name);
        t.material.needsUpdate = true;
      }
      if (normals.has(t.material.name)) {
        t.material.normalMap = normals.get(t.material.name);
        t.material.needsUpdate = true;
      }
    });
  }, [scene, textures]);

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials.BirchTree_Bark}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_1.geometry}
        material={materials.BirchTree_Leaves}
      />
    </group>
  );

  return <primitive object={scene}></primitive>;
};

export default Trees;

// function Stars() {
//   const ref = useRef<any>();
//   const [sphere] = useState(() =>
//     maath.random.inSphere(new Float32Array(5000), { radius: 1.5 })
//   );
//   return (
//     <group rotation={[0, 0, Math.PI / 4]}>
//       <Points
//         ref={ref}
//         positions={sphere as any}
//         stride={3}
//         frustumCulled={false}
//       >
//         <PointMaterial
//           transparent
//           color='#ffa0e0'
//           size={0.005}
//           sizeAttenuation={true}
//           depthWrite={false}
//         />
//       </Points>
//     </group>
//   );
// }
