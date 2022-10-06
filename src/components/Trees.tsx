import { useGLTF, useTexture } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useEffect } from 'react';

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

const Trees: React.FunctionComponent = () => {
  const { scene } = useGLTF('/foilage/BirchTree_1.gltf') as any;
  const textures = useTexture(
    TEXTURES.map((t) => `/foilage/textures/${t}.png`)
  );

  useEffect(() => {
    textures.forEach((t) => (t.flipY = false));

    scene.traverse((t: any) => {
      if (t.isMesh) {
        const textureIndex = TEXTURES.findIndex((x) => x === t.material.name);
        if (textureIndex !== -1) {
          t.material.map = textures[textureIndex];
          t.material.needsUpdate = true;
        }
      }
    });
  }, [scene, textures]);

  return <primitive object={scene}></primitive>;
};

export default Trees;
