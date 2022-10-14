import { Center, Html, Text3D } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import Image from 'next/image';
import { MouseEventHandler, useCallback, useState } from 'react';
import { Euler, Vector3 } from 'three';
import { generateUUID } from 'three/src/math/MathUtils';
import { WORLD } from '../../contants/world.const';
import { isNil } from '../../functions/is-nil.fn';
import { useCameraStore } from '../../store/camera.store';
import { usePlayerStore } from '../../store/player.store';
import Experience from '../bio/Experience';
import Intro from '../bio/Intro';
import Skills from '../bio/Skills';
import { animated, useSpring } from '@react-spring/web';
import HtmlThreeElement from '../three-constructs/HtmlThreeElement';

const OBELISK_HEIGHT = 5;
const OBELISK_WIDTH = 2.8;
const OBELISK_DEPTH = 0.25;
const MAX_PLAYER_DISTANCE_FOR_VIEW = 5;
const MAX_PLAYER_DISTANCE_FROM_CENTER_BUFFER_FOR_VIEW = 10;

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

  const [isLookingAtObelisk, setIsLookingAtObelisk] = useState(false);
  const [isFocusedOnObelisk, setIsFocusedOnObelisk] = useState(false);

  const focusObelisk = useCallback(() => {
    const idealLookAt = position;
    const idealPosition = position.clone().multiplyScalar(0.6);
    setCamera((state) => ({ idealLookAt, idealPosition }));
    setPlayerPaused(true);
    setPlayerHidden(true);
    setIsFocusedOnObelisk(true);
  }, [position, rotation]);

  const stopFocusObelisk = useCallback(() => {
    setCamera((state) => ({ idealLookAt: null, idealPosition: null }));
    setPlayerPaused(false);
    setPlayerHidden(false);
    setIsFocusedOnObelisk(false);
  }, [position, rotation]);

  useFrame(() => {
    const playerPosition =
      usePlayerStore.getState().playerApi?.objectRef.current?.position;
    const playerRotation =
      usePlayerStore.getState().playerApi?.objectRef.current?.rotation;
    if (isNil(playerPosition) || isNil(playerRotation)) {
      return;
    }

    const isNowLookingAtObelisk =
      playerPosition.distanceTo(position) <= MAX_PLAYER_DISTANCE_FOR_VIEW &&
      playerPosition.lengthSq() <=
        position.lengthSq() - MAX_PLAYER_DISTANCE_FROM_CENTER_BUFFER_FOR_VIEW;

    if (isLookingAtObelisk !== isNowLookingAtObelisk) {
      setIsLookingAtObelisk(isNowLookingAtObelisk);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <ObeliskBlock />
      <ObeliskTitle title={title} />

      <HtmlThreeElement width={20} height={20} />

      {isLookingAtObelisk && (
        <>
          <ObeliskButton onClick={focusObelisk} icon='view.svg' />
        </>
      )}

      {isFocusedOnObelisk && (
        <>
          <ObeliskContent>{children}</ObeliskContent>
          <ObeliskButton onClick={stopFocusObelisk} icon='close.svg' />
        </>
      )}
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

const ObeliskBlock: React.FunctionComponent = () => {
  return (
    <mesh castShadow>
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
      className='w-24 h-48 text-white'
    >
      <div className='origin-top-left scale-50 w-48 h-96 overflow-y-auto text-xs'>
        {children}
      </div>
    </Html>
  );
};

interface ObeliskButton {
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: string;
}
const ObeliskButton: React.FunctionComponent<ObeliskButton> = ({
  onClick,
  icon,
}) => {
  const springProps = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { bounce: 2, tension: 500 },
  });

  return (
    <>
      <Html
        transform
        position={[-1.7, 0.5 + OBELISK_TITLE_HEIGHT / 2, 0.15]}
        center
      >
        <animated.button
          style={springProps}
          onClick={onClick}
          className='bg-slate-300  rounded-full hover:bg-slate-200 grid items-center p-1'
        >
          <Image layout='fixed' src={'/icons/' + icon} width={16} height={16} />
        </animated.button>
      </Html>
    </>
  );
};

export default Obelisks;
