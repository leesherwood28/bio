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
import { generateUUID } from 'three/src/math/MathUtils';
import { WORLD_RADIUS } from '../contants/world-radius.const';

// Models used with love from https://quaternius.com/;

interface Model {
  radius: number;
  item: Group;
  id: string;
  position: Vector3;
}

const Foliage: React.FunctionComponent = () => {
  const MAX_DISTANCE = 50;

  return (
    <>
      <RandomFoliageSet path={'Willow_Autumn'} number={10} available={5} />

      <RandomFoliageSet path={'BirchTree_Autumn'} number={5} available={5} />

      <RandomFoliageSet path={'Bush'} number={5} available={2} />

      <RandomFoliageSet path={'CommonTree_Autumn'} number={5} available={5} />

      <RandomFoliageSet path={'Corn'} number={5} available={2} />

      <RandomFoliageSet path={'Rock'} number={5} available={7} />

      <RandomFoliageSet path={'Rock_Moss'} number={5} available={7} />

      <RandomFoliageSet path={'Plant'} number={50} available={5} />

      <RandomFoliageSet path={'LongGrass'} number={10} available={2} />
      <RandomFoliageSet path={'Grass'} number={100} available={1} />
    </>
  );
};

interface FoilageSetParams {
  path: string;
  number: number;
  available: number;
}

const randomDistanceGen = (): number => {
  const number = Math.random();
  return 1 - number ** 8;
};

const RandomFoliageSet: React.FunctionComponent<FoilageSetParams> = ({
  path,
  available,
  number,
}) => {
  const [foilage] = useState(() => {
    return Array.from({ length: number }).map((_, i) => {
      const position = new Vector3(
        randomDistanceGen() * WORLD_RADIUS
      ).applyEuler(new Euler(0, Math.random() * 2 * Math.PI, 0));

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

  return (
    <>
      {foilage.map((f) => (
        <primitive
          scale={0.02}
          key={f.id}
          object={f.item}
          position={f.position}
        />
      ))}
    </>
  );
};

export default Foliage;
