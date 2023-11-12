import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import Link from 'next/link';
import { Parameters, Slots } from '../props';

export const ThreeItemGridComponent = ({
  component,
  context,
  slots
}: ComponentProps<Parameters, Slots>) => {
  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <UniformSlot context={context} data={component} slot={slots.tiles}>
        {({ child, component, key }) => {
          const { url } = component.parameters || {};
          const targetUrl = (url?.value as LinkParamValue)?.path;
          return (
            <div
              key={key}
              className={
                (key as string).endsWith('0')
                  ? 'md:col-span-4 md:row-span-2'
                  : 'md:col-span-2 md:row-span-1'
              }
            >
              <Link className="relative block aspect-square h-full w-full" href={targetUrl ?? '#'}>
                {child}
              </Link>
            </div>
          );
        }}
      </UniformSlot>
    </section>
  );
};
