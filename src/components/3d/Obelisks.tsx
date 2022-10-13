import { Html } from '@react-three/drei';
import produce from 'immer';
import { createRef, RefObject } from 'react';
import { Euler, Vector3 } from 'three';
import { generateUUID } from 'three/src/math/MathUtils';
import create from 'zustand';
import { WORLD } from '../../contants/world.const';

interface ObeliskStore {
  obeliskMeshes: any[];
  addObeliskMesh: (mesh: any) => void;
}
const useObeliskStore = create<ObeliskStore>((set) => {
  return {
    obeliskMeshes: [],
    addObeliskMesh: (mesh: any) =>
      set(
        produce<ObeliskStore>((state) => {
          state.obeliskMeshes.push(mesh);
        })
      ),
  };
});

interface ObeliskDef {
  key: string;
  title: string;
  position: Vector3;
  rotation: Euler;
  meshRef: RefObject<any>;
}

const ObeliskDistance = WORLD.centerRadiusEnd - 3;
const centralObeliskPosition = new Vector3(0, 0, ObeliskDistance);

const OBELISK_DEFS: ObeliskDef[] = [
  {
    key: generateUUID(),
    title: 'Intro',
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, -Math.PI / 2, 0)),
    rotation: new Euler(0, Math.PI / 2, 0),
    meshRef: createRef(),
  },
  {
    key: generateUUID(),
    title: 'Skills',
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, -Math.PI / 4, 0)),
    rotation: new Euler(0, (3 * Math.PI) / 4, 0),
    meshRef: createRef(),
  },

  {
    key: generateUUID(),
    title: 'Tech',
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, Math.PI / 2, 0)),
    rotation: new Euler(0, -Math.PI / 2, 0),
    meshRef: createRef(),
  },
  {
    key: generateUUID(),
    title: 'Experience',
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, Math.PI / 4, 0)),
    rotation: new Euler(0, (3 * -Math.PI) / 4, 0),
    meshRef: createRef(),
  },
];

const Obelisks: React.FunctionComponent = () => {
  return (
    <>
      {OBELISK_DEFS.map((o) => (
        <Obelisk
          key={o.key}
          position={o.position}
          rotation={o.rotation}
          title={o.title}
          meshRef={o.meshRef}
          occlude={OBELISK_DEFS.map((o) => o.meshRef)}
        />
      ))}
    </>
  );
};

export interface ObeliskParams {
  position: Vector3;
  rotation: Euler;
  title: string;
  meshRef: RefObject<any>;
  occlude: RefObject<any>[];
}

const OBELISK_HEIGHT = 10;
const OBELISK_WIDTH = 2.5;
const OBELISK_DEPTH = 0.25;

const Obelisk: React.FunctionComponent<ObeliskParams> = ({
  position,
  rotation,
  title,
  meshRef,
  occlude,
}) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh ref={meshRef} castShadow>
        <boxGeometry
          args={[OBELISK_WIDTH, OBELISK_HEIGHT, OBELISK_DEPTH]}
        ></boxGeometry>
        <meshPhysicalMaterial
          color={'black'}
          clearcoat={1}
        ></meshPhysicalMaterial>
      </mesh>
      <Html
        occlude={occlude}
        transform
        position={[0, OBELISK_HEIGHT / 4, 0.15]}
        center
        className='w-20 h-48 text-white'
      >
        <h2 className='text-l font-mono mb-1'>{title}</h2>
        <div className='scale-50 origin-top-left w-40 h-96 overflow-y-auto'>
          <p className='text-white'> Gonna Talk About Myself here </p>
          <p className='text-white'> Gonna Talk About Myself here </p>
          <p className='text-white'> Gonna Talk About Myself here </p>
        </div>
      </Html>
    </group>
  );
};

export default Obelisks;
