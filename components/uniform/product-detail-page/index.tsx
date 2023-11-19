import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { Suspense } from 'react';
import { Parameters, Slots } from './props';

export const ProductDetailPageComponent = ({
  component,
  context,
  slots
}: ComponentProps<Parameters, Slots>) => {
  return (
    <>
      <UniformSlot context={context} data={component} slot={slots.header} />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <UniformSlot context={context} data={component} slot={slots.leftContent} />
          </div>
          <div className="basis-full lg:basis-2/6">
            <UniformSlot context={context} data={component} slot={slots.rightContent} />
          </div>
        </div>
        <Suspense>
          <UniformSlot context={context} data={component} slot={slots.lowerRail} />
          <UniformSlot context={context} data={component} slot={slots.footer} />
        </Suspense>
      </div>
    </>
  );
};
