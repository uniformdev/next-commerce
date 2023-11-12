import { PageParameters, UniformComposition, retrieveRoute } from '@uniformdev/canvas-next-rsc';
import Footer from 'components/layout/footer';
import { resolveComponent } from 'uniform/resolve';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage(props: PageParameters) {
  const route = await retrieveRoute(props);
  return (
    <>
      <UniformComposition
        {...props}
        route={route}
        resolveComponent={resolveComponent}
        mode="server"
      />
      <Footer />
    </>
  );
}
