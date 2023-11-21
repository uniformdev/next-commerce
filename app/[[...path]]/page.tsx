import {
  ContextUpdateTransfer,
  PageParameters,
  UniformComposition,
  createServerUniformContext,
  retrieveRoute
} from '@uniformdev/canvas-next-rsc';
import TrackerScoreSync from 'components/tracker-score-sync';
import { resolveComponent } from 'uniform/resolve';

// Enabled edge runtime for the maximum oompf
//export const runtime = 'edge';

// Enabled SSG mode
export { generateStaticParams } from '@uniformdev/canvas-next-rsc';

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
      {/* This component only works as expected in SSR mode. If used with SSG, this call is made only once during static-site generation at build-time. Use "TrackerScoreSync component for SSG mode */}
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
        mode="static"
      />
      <TrackerScoreSync />
    </>
  );
}
