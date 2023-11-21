import { LinkParamValue, RichTextParamValue } from '@uniformdev/canvas';
import { NavItem } from '../navbar/props';

export type AssetParamValue = AssetParamValueItem[];

export type AssetParamValueItem = {
  type: string;
  _id: string;
  /**
   * Internal Uniform source ID or
   * dataType ID of the global integration library
   * which created this asset item
   */
  _source?: string;
  fields: {
    url: { type: 'text'; value: string };
    id?: { type: 'text'; value: string | undefined };
    title?: { type: 'text'; value: string | undefined };
    description?: { type: 'text'; value: string | undefined };
    mediaType?: { type: 'text'; value: string | undefined };
    /**
     * The width of the original asset
     *
     * Should resolve to a number but might
     * be a string with a pointer reference
     */
    width?: { type: 'number'; value: number | string | undefined };
    /**
     * The height of the original asset
     *
     * Should resolve to a number but might
     * be a string with a pointer reference
     */
    height?: { type: 'number'; value: number | string | undefined };
    /**
     * The size in bytes of the original asset
     *
     * Should resolve to a number but might
     * be a string with a pointer reference
     */
    size?: { type: 'number'; value: number | string | undefined };
  };
};

export type Parameters = {
  siteName: string;
  logo: AssetParamValue;
  ctaLink: LinkParamValue;
  ctaImage: AssetParamValue;
  ctaTitle: string;
  menu: Array<NavItem>;
  footerText: RichTextParamValue;
};

export type Slots = string;
