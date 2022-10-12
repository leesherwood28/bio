import { useState } from 'react';
import { Euler, Group, Vector3 } from 'three';
import { generateUUID } from 'three/src/math/MathUtils';
import { WORLD } from '../contants/world.const';
import { useFbxWithShadows } from '../hooks/use-fbx-with-shadows';

// Models used with love from https://quaternius.com/;

const Foliage: React.FunctionComponent = () => {
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
}) => {
  const [foilage] = useState<FoilageItem[]>(() => {
    return Array.from({ length: number }).map((_, i) => {
      const position = new Vector3(randomFoliageDistanceGen()).applyEuler(
        new Euler(0, Math.random() * 2 * Math.PI, 0)
      );

      const randomIndex = Math.floor(Math.random() * available) + 1;

      const foilageItem: FoilageItem = {
        id: generateUUID(),
        path: `/foilage/${path}_${randomIndex}.fbx`,
        position: position,
        radius: 1,
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
  radius: number;
}

const FoilageItem: React.FunctionComponent<FoilageItem> = ({
  path,
  position,
  radius,
}) => {
  const foilage = useFbxWithShadows(path).clone();

  return <primitive scale={0.02} object={foilage} position={position} />;
};

export default Foliage;
