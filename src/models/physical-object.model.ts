import { Ref } from 'react';
import { Object3D, Vector3 } from 'three';

export interface PhysicalObject {
  id: string;
  radius: number;
  velocity: Vector3;
  angularVelocity: Vector3;
  object: Ref<Object3D>;
}
