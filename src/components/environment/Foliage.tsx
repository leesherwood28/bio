import { RigidBody } from '@react-three/rapier';
import { useState } from 'react';
import { Euler, Vector3 } from 'three';
import { generateUUID } from 'three/src/math/MathUtils';
import { WORLD } from '../../contants/world.const';
import { useFbx } from '../../hooks/use-fbx';

// Models used with love from https://quaternius.com/;

const Foliage: React.FunctionComponent = () => {
  return (
    <>
      <RandomFoliageSet
        path={'Willow_Autumn'}
        number={10}
        available={5}
        rigidBody
        centerDistanceBuffer={3}
      />

      <RandomFoliageSet
        path={'BirchTree_Autumn'}
        number={5}
        available={5}
        rigidBody
        centerDistanceBuffer={3}
      />

      <RandomFoliageSet path={'Bush'} number={5} available={2} rigidBody />

      <RandomFoliageSet
        path={'CommonTree_Autumn'}
        number={5}
        available={5}
        rigidBody
        centerDistanceBuffer={3}
      />

      <RandomFoliageSet path={'Corn'} number={5} available={2} />

      <RandomFoliageSet path={'Rock'} number={5} available={7} rigidBody />

      <RandomFoliageSet path={'Rock_Moss'} number={5} available={7} rigidBody />

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
  rigidBody?: boolean;
  centerDistanceBuffer?: number;
}

const clamp = (value: number, min: number, max: number): number => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

const randomFoliageDistanceGen = (buffer?: number): number => {
  if (!WORLD.foilage) {
    throw new Error('No definitions for foilage');
  }
  return clamp(
    WORLD.foilage.radiusStart +
      Math.random() * (WORLD.foilage.radiusEnd - WORLD.foilage.radiusStart),
    WORLD.foilage.radiusStart + (buffer ?? 0),
    WORLD.foilage.radiusEnd - (buffer ?? 0)
  );
};

const RandomFoliageSet: React.FunctionComponent<FoilageSetParams> = ({
  path,
  available,
  number,
  rigidBody,
  centerDistanceBuffer,
}) => {
  const [foilage] = useState<FoilageItem[]>(() => {
    return Array.from({ length: number }).map((_, i) => {
      let rotation = (Math.random() - 0.5) * 2 * Math.PI;
      if (Math.abs(rotation) < Math.PI / 6) {
        rotation = (Math.sign(rotation) * Math.PI) / 6;
      }

      const position = new Vector3(
        0,
        0,
        randomFoliageDistanceGen(centerDistanceBuffer)
      ).applyEuler(new Euler(0, rotation, 0));

      const randomIndex = Math.floor(Math.random() * available) + 1;

      const foilageItem: FoilageItem = {
        id: generateUUID(),
        path: `/foilage/${path}_${randomIndex}.fbx`,
        position: position,
        rigidBody: rigidBody,
      };
      return foilageItem;
    });
  });

  return (
    <>
      {foilage.map((f) => (
        <FoilageItem key={f.id} {...f}></FoilageItem>
      ))}
    </>
  );
};

interface FoilageItem {
  id: string;
  path: string;
  position: Vector3;
  rigidBody?: boolean;
}

const FoilageItem: React.FunctionComponent<FoilageItem> = ({
  path,
  position,
  rigidBody,
}) => {
  const foilage = useFbx(path, { useShadows: WORLD.includeShadows }).clone();

  const primitive = (
    <primitive scale={0.02} object={foilage} position={position} />
  );
  return (
    <>
      {rigidBody ? (
        <RigidBody type='fixed' colliders='hull'>
          {primitive}
        </RigidBody>
      ) : (
        primitive
      )}
    </>
  );
};

export default Foliage;
