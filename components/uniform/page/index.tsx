import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { Suspense } from 'react';
import { Parameters, Slots } from './props';

export const PageComponent = ({ component, context, slots }: ComponentProps<Parameters, Slots>) => {
  return (
    <>
      <UniformSlot context={context} data={component} slot={slots.header} />
      <main>
        <UniformSlot context={context} data={component} slot={slots.content} />
      </main>
      <Suspense>
        <UniformSlot context={context} data={component} slot={slots.footer} />
      </Suspense>
    </>
  );
};
