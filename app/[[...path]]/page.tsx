import {
  ContextUpdateTransfer,
  PageParameters,
  UniformComposition,
  createServerUniformContext,
  retrieveRoute
} from '@uniformdev/canvas-next-rsc';
import { resolveComponent } from 'uniform/resolve';

// Enabled edge runtime for the maximum oompf
export const runtime = 'edge';

// If you wanna go static, remove the runtime directive above and uncomment this line
// export { generateStaticParams } from '@uniformdev/canvas-next-rsc';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Uniform',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage(props: PageParameters) {
  const serverContext = await createServerUniformContext({
    searchParams: props.searchParams
  });

  const route = await retrieveRoute(props);
  return (
    <>
      <ContextUpdateTransfer
        serverContext={serverContext}
        update={{
          quirks: {
            audience: 'Hipsters'
          }
        }}
      />
      <UniformComposition
        {...props}
        route={route}
        resolveComponent={resolveComponent}
        mode="server"
      />
    </>
  );
}
