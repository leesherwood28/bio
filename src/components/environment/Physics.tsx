import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Euler, Quaternion } from 'three';
import { isNil } from '../../functions/is-nil.fn';
import { PhysicalObject } from '../../models/physical-object.model';
import { usePhysicsStore } from '../../store/physics.store';

const progressPhysics = (
  physicalObject: PhysicalObject,
  elapsedTime: number
) => {
  const object = physicalObject.objectRef.current;
  if (isNil(object)) {
    return;
  }

  object.position.add(
    physicalObject.velocity.clone().multiplyScalar(elapsedTime)
  );
  const rotationEuler = new Euler(
    ...physicalObject.angularVelocity
      .clone()
      .multiplyScalar(elapsedTime)
      .toArray()
  );
  object.applyQuaternion(new Quaternion().setFromEuler(rotationEuler));
};

const Physics: React.FunctionComponent = () => {
  const physicalObjects = useRef<PhysicalObject[]>([]);

  useEffect(() => {
    return usePhysicsStore.subscribe(
      (s) => (physicalObjects.current = s.objects)
    );
  }, []);

  useFrame((state, elapsedTime) => {
    physicalObjects.current.forEach((o) => progressPhysics(o, elapsedTime));
  });
  return null;
};

export default Physics;
