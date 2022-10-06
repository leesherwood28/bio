import { useGLTF, useTexture } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useEffect } from 'react';
import { Texture } from 'three';

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
  const { scene } = useGLTF('/foilage/BirchTree_1.gltf') as any;
  const textures = useTexturesMap(
    TEXTURES,
    (t) => `/foilage/textures/${t}.png`
  );
  const normals = useTexturesMap(
    NORMALS,
    (t) => `/foilage/textures/${t}_Normal.png`
  );

  useEffect(() => {
    textures.forEach((t) => (t.flipY = false));

    scene.traverse((t: any) => {
      if (!t.isMesh) {
        return;
      }
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

  return <primitive object={scene}></primitive>;
};

export default Trees;
