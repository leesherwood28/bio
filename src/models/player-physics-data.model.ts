import { Triplet } from '@react-three/cannon';

export interface PlayerPhysicsData {
  velocity: Triplet;
  angularVelocity: Triplet;
  position: Triplet;
  rotation: Triplet;
}
