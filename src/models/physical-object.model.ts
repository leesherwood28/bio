import { Ref, RefObject } from 'react';
import { Object3D, Vector3 } from 'three';

export interface PhysicalObject<T extends Object3D = Object3D> {
  id: string;
  radius: number;
  velocity: Vector3;
  angularVelocity: Vector3;
  objectRef: RefObject<T>;
}
