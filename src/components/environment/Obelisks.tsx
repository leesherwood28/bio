import { Center, Html, Text3D } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import Image from 'next/image';
import { MouseEventHandler, useCallback, useState } from 'react';
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
    <group position={position} rotation={rotation}>
      <ObeliskBlock onClick={focusObelisk} />
      <ObeliskTitle title={title} />

      {isLookingAtObelisk ? (
        <>
          <ObeliskContent>{children}</ObeliskContent>
          <CloseObeliskFocusButton onClick={stopFocusObelisk} />
        </>
      ) : null}
    </group>
  );
};

interface ObeliskTitle {
  title: string;
}

const ObeliskTitle: React.FunctionComponent<ObeliskTitle> = ({ title }) => {
  return (
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
  );
};

interface ObeliskBlock {
  onClick: (event: ThreeEvent<MouseEvent>) => void;
}

const ObeliskBlock: React.FunctionComponent<ObeliskBlock> = ({ onClick }) => {
  return (
    <mesh onClick={onClick} castShadow>
      <boxGeometry
        args={[OBELISK_WIDTH, OBELISK_HEIGHT, OBELISK_DEPTH]}
      ></boxGeometry>
      <meshPhysicalMaterial
        color={'black'}
        clearcoat={1}
      ></meshPhysicalMaterial>
    </mesh>
  );
};

interface CloseObeliskFocusButton {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const CloseObeliskFocusButton: React.FunctionComponent<
  CloseObeliskFocusButton
> = ({ onClick }) => {
  return (
    <ObeliskButton onClick={onClick}>
      <Image layout='fixed' src='/icons/close.svg' width={16} height={16} />
    </ObeliskButton>
  );
};

interface ObeliskContent {
  children: React.ReactNode;
}

const ObeliskContent: React.FunctionComponent<ObeliskContent> = ({
  children,
}) => {
  return (
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
  );
};

interface ObeliskButton {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}
const ObeliskButton: React.FunctionComponent<ObeliskButton> = ({
  onClick,
  children,
}) => {
  return (
    <Html
      transform
      position={[-1.7, 0.5 + OBELISK_TITLE_HEIGHT / 2, 0.15]}
      center
    >
      <button
        onClick={onClick}
        className='bg-slate-300  rounded-full hover:bg-slate-200 grid items-center p-1'
      >
        {children}
      </button>
    </Html>
  );
};

export default Obelisks;
