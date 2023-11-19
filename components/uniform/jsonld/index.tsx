import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { Parameters, Slots } from './props';

export const JsonldComponent = ({
  name,
  description,
  image,
  availability,
  priceCurrency,
  highPrice,
  lowPrice
}: ComponentProps<Parameters, Slots>) => {
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    offers: {
      '@type': 'AggregateOffer',
      availability: availability ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceCurrency: priceCurrency,
      highPrice: highPrice,
      lowPrice: lowPrice
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productJsonLd)
      }}
    />
  );
};
