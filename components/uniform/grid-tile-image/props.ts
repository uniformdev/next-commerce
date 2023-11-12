import { LinkParamValue } from '@uniformdev/canvas';

export type Parameters = {
  name: string;
  price: string;
  image: string;
  url?: LinkParamValue;
  full: boolean;
  isInteractive?: boolean;
  active?: boolean;
};

export type Slots = string;
