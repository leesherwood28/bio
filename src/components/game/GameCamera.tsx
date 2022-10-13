import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Object3D, Vector3 } from 'three';
import { isNil } from '../../functions/is-nil.fn';
import { useCameraStore } from '../../store/camera.store';
import { usePlayerStore } from '../../store/player.store';

const calculateIdealOffset = (object: Object3D) => {
  const idealOffset = new Vector3(-1, 2, -2.5);
  idealOffset.applyQuaternion(object.quaternion);
  idealOffset.add(object.position);
  return idealOffset;
};

const calculateIdealLookat = (object: Object3D) => {
  const idealLookat = new Vector3(0, 1, 5);
  idealLookat.applyQuaternion(object.quaternion);
  idealLookat.add(object.position);
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
      const playerRef = usePlayerStore.getState().playerApi?.objectRef.current;
      if (isNil(playerRef)) {
        return;
      }
      idealPosition = calculateIdealOffset(playerRef);
      idealLookAt = calculateIdealLookat(playerRef);
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
