export type Parameters = {
  images: Array<ProductImage>;
};

export type ProductImage = {
  fields: { altText: { value: string }; src: { value: string }; type?: { value: string } };
};

export type Slots = string;
