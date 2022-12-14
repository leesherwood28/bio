import { animated, useSpring } from '@react-spring/web';
import { Center, Html, Text3D } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import Image from 'next/image';
import { MouseEventHandler, useCallback, useMemo, useState } from 'react';
import { Euler, Vector3 } from 'three';
import { generateUUID } from 'three/src/math/MathUtils';
import { WORLD } from '../../contants/world.const';
import { isNil } from '../../functions/is-nil.fn';
import { useCameraStore } from '../../store/camera.store';
import { usePlayerStore } from '../../store/player.store';
import Contact from '../bio/Contact';
import Intro from '../bio/Intro';
import Skills from '../bio/Skills';
import HtmlThreeElement from '../three-constructs/HtmlThreeElement';
import ProffesionalExperience from '../bio/ProffesionalExperience';
import PersonalExperience from '../bio/PersonalExperience';
import Education from '../bio/Eduction';

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

const ObeliskDistanceFromEdge = 2;
const ObeliskDistance = WORLD.centralAreaRadius - ObeliskDistanceFromEdge;
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
      .applyEuler(new Euler(0, (1.5 * Math.PI) / 2, 0)),
    rotation: new Euler(0, (-0.5 * Math.PI) / 2, 0),
    component: <Intro />,
  },
  {
    key: generateUUID(),
    title: 'Skills',
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, Math.PI / 2, 0)),
    rotation: new Euler(0, -Math.PI / 2, 0),
    component: <Skills />,
  },
  {
    key: generateUUID(),
    title: 'Proffesional \n Experience',
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, Math.PI / 4, 0)),
    rotation: new Euler(0, (3 * -Math.PI) / 4, 0),
    component: <ProffesionalExperience />,
  },
  {
    key: generateUUID(),
    title: 'Personal \n Experience',
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, -Math.PI / 4, 0)),
    rotation: new Euler(0, (3 * Math.PI) / 4, 0),
    component: <PersonalExperience />,
  },
  {
    key: generateUUID(),
    title: 'Education',
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, -Math.PI / 2, 0)),
    rotation: new Euler(0, Math.PI / 2, 0),
    component: <Education />,
  },

  {
    key: generateUUID(),
    title: 'Contact',
    position: centralObeliskPosition
      .clone()
      .applyEuler(new Euler(0, (-1.5 * Math.PI) / 2, 0)),
    rotation: new Euler(0, 0.25 * Math.PI, 0),
    component: <Contact />,
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

const OBELISK_TITLE_HEIGHT = 2.6;

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
    const idealPosition = position
      .clone()
      .multiplyScalar(0.6)
      .add(new Vector3(0, 0.5, 0));
    setCamera((state) => ({ idealLookAt, idealPosition }));
    setPlayerPaused(true);
    setPlayerHidden(true);
    setIsFocusedOnObelisk(true);
  }, [
    position,
    setCamera,
    setPlayerPaused,
    setPlayerHidden,
    setIsFocusedOnObelisk,
  ]);

  const stopFocusObelisk = useCallback(() => {
    setCamera((state) => ({ idealLookAt: null, idealPosition: null }));
    setPlayerPaused(false);
    setPlayerHidden(false);
    setIsFocusedOnObelisk(false);
  }, [setCamera, setPlayerPaused, setPlayerHidden, setIsFocusedOnObelisk]);

  useFrame(() => {
    const playerPosition = usePlayerStore
      .getState()
      .playerApi.current?.translation();
    const playerRotation = usePlayerStore
      .getState()
      .playerApi.current?.rotation();
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
      <ObeliskContent>{children}</ObeliskContent>

      {isLookingAtObelisk && !isFocusedOnObelisk && (
        <>
          <ObeliskButton
            onClick={focusObelisk}
            icon='view.svg'
            imgAlt='View Icon'
          />
        </>
      )}

      {isFocusedOnObelisk && (
        <>
          <ObeliskButton
            onClick={stopFocusObelisk}
            icon='close.svg'
            imgAlt='Stop Viewing Icon'
          />
        </>
      )}
    </group>
  );
};

interface ObeliskTitle {
  title: string;
}

const ObeliskTitle: React.FunctionComponent<ObeliskTitle> = ({ title }) => {
  const text = useMemo(
    () => (
      <Text3D
        font={'/fonts/Montserrat_Thin_Regular.json'}
        bevelEnabled
        bevelSize={0.01}
        size={0.4}
        bevelThickness={0.001}
      >
        {title}
        <meshNormalMaterial />
      </Text3D>
    ),
    [title]
  );
  return (
    <Center top position={[0, OBELISK_TITLE_HEIGHT, 0]}>
      {text}
    </Center>
  );
};

const ObeliskBlock: React.FunctionComponent = () => {
  return (
    <RigidBody colliders='cuboid' type='fixed'>
      <mesh castShadow>
        <boxGeometry
          args={[OBELISK_WIDTH, OBELISK_HEIGHT, OBELISK_DEPTH]}
        ></boxGeometry>
        <meshPhysicalMaterial
          color={'black'}
          clearcoat={1}
        ></meshPhysicalMaterial>
      </mesh>
    </RigidBody>
  );
};

interface ObeliskContent {
  children: React.ReactNode;
}

const contentScaler = 160;

const ObeliskContent: React.FunctionComponent<ObeliskContent> = ({
  children,
}) => {
  return (
    <HtmlThreeElement scaler={contentScaler} position={[0, 0, 0.15]}>
      <div
        style={{
          width: OBELISK_WIDTH * contentScaler,
          height: OBELISK_HEIGHT * contentScaler,
        }}
        className='bg-black text-white overflow-y-auto p-4'
      >
        {children}
      </div>
    </HtmlThreeElement>
  );
};

interface ObeliskButton {
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: string;
  imgAlt: string;
}
const ObeliskButton: React.FunctionComponent<ObeliskButton> = ({
  onClick,
  icon,
  imgAlt,
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
        position={[-1.2, 0.9 + OBELISK_TITLE_HEIGHT / 2, 0.15]}
        center
      >
        <animated.button
          style={springProps}
          onClick={onClick}
          className=' bg-opacity-40 bg-slate-300  rounded-full hover:bg-slate-200 grid items-center p-1'
        >
          <Image
            layout='fixed'
            src={'/icons/' + icon}
            width={16}
            height={16}
            alt={imgAlt}
          />
        </animated.button>
      </Html>
    </>
  );
};

export default Obelisks;
