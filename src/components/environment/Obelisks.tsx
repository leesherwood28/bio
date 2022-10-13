import { Center, Html, Text3D } from '@react-three/drei';
import { useCallback, useState } from 'react';
import { Euler, Vector3 } from 'three';
import { generateUUID } from 'three/src/math/MathUtils';
import { WORLD } from '../../contants/world.const';
import { useCameraStore } from '../../store/camera.store';
import { usePlayerStore } from '../../store/player.store';
import Experience from '../bio/Experience';
import Intro from '../bio/Intro';
import Skills from '../bio/Skills';

const OBELISK_HEIGHT = 5;
const OBELISK_WIDTH = 2.5;
const OBELISK_DEPTH = 0.25;

interface ObeliskDef {
  key: string;
  title: string;
  position: Vector3;
  rotation: Euler;
  component: React.ReactNode;
}

const ObeliskDistance = WORLD.centerRadiusEnd - 3;
const centralObeliskPosition = new Vector3(
  0,
  OBELISK_HEIGHT / 2,
  ObeliskDistance
);

const OBELISK_DEFS: ObeliskDef[] = [
  {
    key: generateUUID(),
    title: 'Intro',
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, -Math.PI / 2, 0)),
    rotation: new Euler(0, Math.PI / 2, 0),
    component: <Intro />,
  },
  {
    key: generateUUID(),
    title: 'Skills',
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, -Math.PI / 4, 0)),
    rotation: new Euler(0, (3 * Math.PI) / 4, 0),
    component: <Skills />,
  },

  {
    key: generateUUID(),
    title: 'Tech',
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, Math.PI / 2, 0)),
    rotation: new Euler(0, -Math.PI / 2, 0),
    component: <Skills />,
  },
  {
    key: generateUUID(),
    title: 'Experience',
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, Math.PI / 4, 0)),
    rotation: new Euler(0, (3 * -Math.PI) / 4, 0),
    component: <Experience />,
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
        >
          {o.component}
        </Obelisk>
      ))}
    </>
  );
};

export interface ObeliskParams {
  position: Vector3;
  rotation: Euler;
  title: string;
  children: React.ReactNode;
}

const OBELISK_TITLE_HEIGHT = OBELISK_HEIGHT / 2 + 0.4;

const Obelisk: React.FunctionComponent<ObeliskParams> = ({
  position,
  rotation,
  title,
  children,
}) => {
  const setCamera = useCameraStore((s) => s.set);
  const setPlayerPaused = usePlayerStore((s) => s.setIsPaused);
  const setPlayerHidden = usePlayerStore((s) => s.setIsHidden);

  const focusObelisk = useCallback(() => {
    const idealLookAt = position;
    const idealPosition = position.clone().multiplyScalar(0.6);
    setCamera((state) => ({ idealLookAt, idealPosition }));
    setPlayerPaused(true);
    setPlayerHidden(true);
    setIsLookingAtObelisk(true);
  }, [position, rotation]);

  const stopFocusObelisk = useCallback(() => {
    setCamera((state) => ({ idealLookAt: null, idealPosition: null }));
    setPlayerPaused(false);
    setPlayerHidden(false);
    setIsLookingAtObelisk(false);
  }, [position, rotation]);

  const [isLookingAtObelisk, setIsLookingAtObelisk] = useState(false);

  return (
    <group
      onClick={focusObelisk}
      onDoubleClick={stopFocusObelisk}
      position={position}
      rotation={rotation}
    >
      <mesh castShadow>
        <boxGeometry
          args={[OBELISK_WIDTH, OBELISK_HEIGHT, OBELISK_DEPTH]}
        ></boxGeometry>
        <meshPhysicalMaterial
          color={'black'}
          clearcoat={1}
        ></meshPhysicalMaterial>
      </mesh>
      <Center position={[0, OBELISK_TITLE_HEIGHT, 0]}>
        <Text3D
          font={'/fonts/Montserrat_Thin_Regular.json'}
          bevelEnabled
          bevelSize={0.01}
          size={0.5}
          bevelThickness={0.001}
        >
          {title}
          <meshNormalMaterial />
        </Text3D>
      </Center>

      {isLookingAtObelisk ? (
        <Html
          transform
          position={[0, 0, 0.15]}
          center
          className='w-20 h-48 text-white'
        >
          <div className='scale-50 origin-top-left w-40 h-96 overflow-y-auto'>
            {children}
          </div>
        </Html>
      ) : null}
    </group>
  );
};

export default Obelisks;
