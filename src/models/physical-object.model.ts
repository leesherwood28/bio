import { Object3D, Vector3 } from 'three';

export interface PhysicalObject {
  id: string;
  radius: number;
  velocity: Vector3;
  angularVelocity: Vector3;
  object: Object3D;
}
