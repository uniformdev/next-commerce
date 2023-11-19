import { ComponentProps, UniformText } from '@uniformdev/canvas-next-rsc/component';
import Link from 'next/link';
import { Parameters, Slots } from './props';

export const HeroComponent = ({
  component,
  context,
  description,
  image,
  buttonLink
}: ComponentProps<Parameters, Slots>) => {
  return (
    <section key="1" className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <img
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
            height="550"
            src={image}
            width="550"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <UniformText
                component={component}
                context={context}
                parameterId="title"
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              />
              <p className="max-w-[600px] text-zinc-500 dark:text-zinc-400 md:text-xl">
                {description}
              </p>
            </div>
            <Link
              className="inline-flex h-10 w-1/3 items-center justify-center rounded-md bg-[#FFC1C1] px-8 text-sm font-medium text-[#9400D3] shadow transition-colors hover:bg-[#FFB6C1] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFC1C1] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#FFC1C1] dark:hover:bg-[#FFB6C1] dark:focus-visible:ring-[#FFC1C1]"
              href={buttonLink?.path ?? '#'}
            >
              <UniformText component={component} context={context} parameterId="buttonTitle" />
            </Link>
          </div>
        </div>
      </div>
    </section>
    // <div>
    //   <h1 className="text-xl font-medium">HeroComponent</h1>
    //   <p>
    //     <strong>type/public id</strong>: {component.type}
    //   </p>
    //   <strong>props:</strong>
    //   <ul className="space-y-1 list-disc list-inside">
    //     <li>
    //       <strong>title:</strong> {title}
    //     </li>
    //     <li>
    //       <strong>description:</strong> {description}
    //     </li>
    //     <li>
    //       <strong>image:</strong> {image}
    //     </li>
    //     <li>
    //       <strong>buttonTitle:</strong> {buttonTitle}
    //     </li>
    //     <li>
    //       <strong>buttonLink:</strong>{" "}
    //       <a href={buttonLink?.path ?? "#"}>Link Text</a>
    //     </li>
    //   </ul>
    // </div>
  );
};
