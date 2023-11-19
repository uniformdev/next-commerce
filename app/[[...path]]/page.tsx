import { PageParameters, UniformComposition, retrieveRoute } from '@uniformdev/canvas-next-rsc';
import { resolveComponent } from 'uniform/resolve';

// Enabled edge runtime for the maximum oompf
export const runtime = 'edge';

// If you wanna go static, remove the runtime directive above and uncomment this line
// export { generateStaticParams } from '@uniformdev/canvas-next-rsc';

export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Uniform',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage(props: PageParameters) {
  const route = await retrieveRoute(props);
  return (
    <UniformComposition
      {...props}
      route={route}
      resolveComponent={resolveComponent}
      mode="server"
    />
  );
}
