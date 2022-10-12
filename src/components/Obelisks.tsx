import { useMemo, useState } from 'react';
import { WORLD } from '../contants/world.const';
import { Vector3, Euler } from 'three';
import { generateUUID } from 'three/src/math/MathUtils';

interface ObeliskDef {
  key: string;
  position: Vector3;
  rotation: Euler;
}

const ObeliskDistance = WORLD.centerRadiusEnd - 3;
const centralObeliskPosition = new Vector3(0, 0, ObeliskDistance);

const OBELISK_DEFS: ObeliskDef[] = [
  {
    key: generateUUID(),
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, -Math.PI / 2, 0)),
    rotation: new Euler(0, Math.PI / 2, 0),
  },
  {
    key: generateUUID(),
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, -Math.PI / 4, 0)),
    rotation: new Euler(0, (3 * Math.PI) / 4, 0),
  },

  {
    key: generateUUID(),
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, Math.PI / 2, 0)),
    rotation: new Euler(0, -Math.PI / 2, 0),
  },
  {
    key: generateUUID(),
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, Math.PI / 4, 0)),
    rotation: new Euler(0, (3 * -Math.PI) / 4, 0),
  },
];

const Obelisks: React.FunctionComponent = () => {
  return (
    <>
      {OBELISK_DEFS.map((o) => (
        <Obelisk key={o.key} position={o.position} rotation={o.rotation} />
      ))}
    </>
  );
};

export interface ObeliskParams {
  position?: Vector3;
  rotation?: Euler;
}
const Obelisk: React.FunctionComponent<ObeliskParams> = ({
  position,
  rotation,
}) => {
  return (
    <mesh castShadow position={position} rotation={rotation}>
      <boxGeometry args={[2, 10, 0.25]}></boxGeometry>
      <meshPhysicalMaterial
        color={'black'}
        clearcoat={1}
      ></meshPhysicalMaterial>
    </mesh>
  );
};

export default Obelisks;
