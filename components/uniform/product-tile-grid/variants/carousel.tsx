import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps, UniformSlot, UniformText } from '@uniformdev/canvas-next-rsc/component';
import Link from 'next/link';
import { Parameters, Slots } from '../props';

export const CarouselComponent = ({
  component,
  context,
  slots
}: ComponentProps<Parameters, Slots>) => {
  const { isContextualEditing } = context;
  return (
    <div className="w-full overflow-x-auto pb-6 pt-6">
      <UniformText
        component={component}
        context={context}
        parameterId="title"
        placeholder="Collection name"
        as="h2"
        className="mb-8 pl-12 text-xl font-bold"
      />
      <ul className={`flex ${isContextualEditing ? '' : 'animate-carousel'} gap-4`}>
        <UniformSlot context={context} data={component} slot={slots.tiles}>
          {({ child, component, key }) => {
            const { url } = component.parameters || {};
            const targetUrl = (url?.value as LinkParamValue)?.path;
            return (
              <li
                key={key}
                className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
              >
                <Link href={targetUrl ?? '#'} className="relative h-full w-full">
                  {child}
                </Link>
              </li>
            );
          }}
        </UniformSlot>
      </ul>
    </div>
  );
};
