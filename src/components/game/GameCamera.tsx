import { useFrame, useThree } from '@react-three/fiber';
import { RigidBodyApi } from '@react-three/rapier';
import { useRef } from 'react';
import { Object3D, Vector3 } from 'three';
import { isNil } from '../../functions/is-nil.fn';
import { useCameraStore } from '../../store/camera.store';
import { usePlayerStore } from '../../store/player.store';

const calculateIdealOffset = (object: RigidBodyApi) => {
  const idealOffset = new Vector3(-1, 2, -2.5);
  idealOffset.applyQuaternion(object.rotation());
  idealOffset.add(object.translation());
  return idealOffset;
};

const calculateIdealLookat = (object: RigidBodyApi) => {
  const idealLookat = new Vector3(0, 1, 5);
  idealLookat.applyQuaternion(object.rotation());
  idealLookat.add(object.translation());
  return idealLookat;
};

const GameCamera: React.FunctionComponent = () => {
  const { camera } = useThree();

  const idealLookatRef = useRef(new Vector3());
  const idealPositionRef = useRef(new Vector3());

  useFrame((state, delta) => {
    let { idealLookAt, idealPosition } = useCameraStore.getState();
    if (isNil(idealLookAt) || isNil(idealPosition)) {
      // By default we follow player around;
      const playerApi = usePlayerStore.getState().playerApi.current;
      if (isNil(playerApi)) {
        return;
      }
      idealPosition = calculateIdealOffset(playerApi);
      idealLookAt = calculateIdealLookat(playerApi);
    }
    const lerp = 1.0 - Math.pow(0.001, delta);

    idealPositionRef.current.lerp(idealPosition, lerp);
    idealLookatRef.current.lerp(idealLookAt, lerp);

    camera.position.copy(idealPositionRef.current);
    camera.lookAt(idealLookatRef.current);
  });

  return null;
};

export default GameCamera;
