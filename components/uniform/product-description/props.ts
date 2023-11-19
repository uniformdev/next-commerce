import { ProductOption, ProductVariant } from 'lib/shopify/types';

export type Parameters = {
  title: string;
  price: string;
  description?: string;
  availableForSale: boolean;
  currency: string;
  variants?: Array<{ fields: ProductVariant }>;
  options?: ProductOption[];
};

export type Slots = string;
