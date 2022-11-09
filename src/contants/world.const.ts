import { isMobile } from 'react-device-detect';

interface World {
  radius: number;
  centralAreaRadius: number;
  includeShadows: boolean;
  includeDirectionalLight: boolean;
  foilage?: {
    radiusStart: number;
    radiusEnd: number;
  };
  outerRim?: {
    radiusStart: number;
    radiusEnd: number;
  };
}

const DESKTOP_WORLD: World = {
  radius: 30,
  centralAreaRadius: 11,
  includeShadows: true,
  includeDirectionalLight: true,
  foilage: {
    radiusStart: 11,
    radiusEnd: 25,
  },
  outerRim: {
    radiusStart: 25,
    radiusEnd: 30,
  },
};

const MOBILE_WORLD: World = {
  radius: 11,
  centralAreaRadius: 11,
  includeShadows: false,
  includeDirectionalLight: false,
};

export const WORLD = isMobile ? MOBILE_WORLD : DESKTOP_WORLD;
