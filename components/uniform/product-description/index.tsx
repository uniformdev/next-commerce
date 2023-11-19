import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Parameters, Slots } from './props';

export const ProductDescriptionComponent = ({
  title,
  description,
  price,
  currency,
  variants,
  availableForSale
}: ComponentProps<Parameters, Slots>) => {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price amount={price} currencyCode={currency} />
        </div>
      </div>
      {/* <VariantSelector options={product.options} variants={product.variants} /> */}
      {description ? (
        <Prose className="mb-6 text-sm leading-tight dark:text-white/[60%]" html={description} />
      ) : null}
      <AddToCart
        variants={
          variants?.map((v) => {
            return v.fields;
          })!
        }
        availableForSale={availableForSale}
      />
    </>
  );
};
