import Grid from 'components/grid';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link className="relative inline-block h-full w-full" href={`/product/${product.handle}`}>
            {/* <GridTileImage
              name={product.title}
              price={product.priceRange.maxVariantPrice.amount}
              image={product.featuredImage?.url}
              full={true}
            /> */}
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
