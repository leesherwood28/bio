import { RigidBody } from '@react-three/rapier';
import { useState } from 'react';
import { Euler, Vector3 } from 'three';
import { generateUUID } from 'three/src/math/MathUtils';
import { WORLD } from '../../contants/world.const';
import { useFbxWithShadows } from '../../hooks/use-fbx-with-shadows';

// Models used with love from https://quaternius.com/;

const Foliage: React.FunctionComponent = () => {
  return (
    <>
      <RandomFoliageSet
        path={'Willow_Autumn'}
        number={10}
        available={5}
        rigidBody
      />

      <RandomFoliageSet
        path={'BirchTree_Autumn'}
        number={5}
        available={5}
        rigidBody
      />

      <RandomFoliageSet path={'Bush'} number={5} available={2} rigidBody />

      <RandomFoliageSet
        path={'CommonTree_Autumn'}
        number={5}
        available={5}
        rigidBody
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
}

const randomFoliageDistanceGen = (): number => {
  return (
    WORLD.foilageRadiusStart +
    Math.random() * (WORLD.foilageRadiusEnd - WORLD.foilageRadiusStart)
  );
};

const RandomFoliageSet: React.FunctionComponent<FoilageSetParams> = ({
  path,
  available,
  number,
  rigidBody,
}) => {
  const [foilage] = useState<FoilageItem[]>(() => {
    return Array.from({ length: number }).map((_, i) => {
      let rotation = (Math.random() - 0.5) * 2 * Math.PI;
      if (Math.abs(rotation) < Math.PI / 6) {
        rotation = (Math.sign(rotation) * Math.PI) / 6;
      }

      const position = new Vector3(0, 0, randomFoliageDistanceGen()).applyEuler(
        new Euler(0, rotation, 0)
      );

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
  const foilage = useFbxWithShadows(path).clone();

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
