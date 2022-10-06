import { useFBX, useGLTF, useTexture } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useEffect, useState } from 'react';
import {
  AdditiveBlending,
  DoubleSide,
  Euler,
  Group,
  MaterialLoader,
  ObjectLoader,
  ShaderChunk,
  Texture,
  Vector3,
} from 'three';
import * as maath from 'maath';
import { generateUUID } from 'three/src/math/MathUtils';

// interface ModelData {
//   numberAvailable: number;
//   radius: number;
// }

// interface ModelDef {
//   numberAvailable: number;
//   radius: number;
//   name: string;
// }

// const Models: ModelDef[] = [
//      {
//         name: 'Willow_Autumn',
//         numberAvailable: 5,
//         radius: 5,
//       },
//       BirchTree_Autumn:{
//         name: 'BirchTree_Autumn',
//         numberAvailable: 5,
//         radius: 5,
//       },
//       Bush: {
//         numberAvailable: 5,
//         radius: 2,
//       },
//       CommonTree_Autumn: {
//         numberAvailable: 5,
//         radius: 2,
//       },
//       Corn: {
//         numberAvailable: 2,
//         radius: 0,
//       },
//       Rock: {
//         numberAvailable: 7,
//         radius: 2,
//       },
//       Rock_Moss: {
//         numberAvailable: 7,
//         radius: 2,
//       },
// ]

// Models used with love from https://quaternius.com/;

interface Model {
  radius: number;
  item: Group;
  id: string;
  position: Vector3;
}

const Trees: React.FunctionComponent = () => {
  const MAX_DISTANCE = 50;

  return (
    <>
      <RandomFoliageSet
        path={'Willow_Autumn'}
        number={20}
        available={5}
        maxDistance={MAX_DISTANCE}
      />
    </>
  );
};

interface FoilageSetParams {
  path: string;
  number: number;
  available: number;
  maxDistance: number;
}

const RandomFoliageSet: React.FunctionComponent<FoilageSetParams> = ({
  path,
  available,
  number,
  maxDistance,
}) => {
  const [foilage] = useState(() => {
    return Array.from({ length: number }).map((_, i) => {
      const position = new Vector3(Math.random() * maxDistance).applyEuler(
        new Euler(0, Math.random() * 2 * Math.PI, 0)
      );

      const randomIndex = Math.floor(Math.random() * available) + 1;

      const model: Model = {
        id: generateUUID(),
        item: useFBX(`/foilage/${path}_${randomIndex}.fbx`).clone(),
        position: position,
        radius: 1,
      };
      return model;
    });
  });

  console.log(foilage);

  return (
    <>
      {foilage.map((f) => (
        <primitive
          scale={0.04}
          key={f.id}
          object={f.item}
          position={f.position}
        />
      ))}
    </>
  );
};

export default Trees;
