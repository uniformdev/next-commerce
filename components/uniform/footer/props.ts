import { LinkParamValue, RichTextParamValue } from '@uniformdev/canvas';
import { NavItem } from '../navbar/props';

export type Parameters = {
  siteName: string;
  logo: [{ url: string }];
  ctaLink: LinkParamValue;
  ctaImage: [{ url: string }];
  ctaTitle: string;
  menu: Array<NavItem>;
  footerText: RichTextParamValue;
};

export type Slots = string;
