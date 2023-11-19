import { LinkParamValue } from '@uniformdev/canvas';

export type Parameters = {
  siteName: string;
  logo: [{ url: string }];
  menu: Array<NavItem>;
};

export type NavItem = {
  fields: {
    title: {
      value: string;
    };
    link: {
      value: LinkParamValue;
    };
  };
};

export type Slots = string;
