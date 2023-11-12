import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { Parameters, Slots } from './props';
import { CarouselComponent } from './variants/carousel';
import { ThreeItemGridComponent } from './variants/featured-grid';

export const ProductTileGridComponent = (props: ComponentProps<Parameters, Slots>) => {
  return props?.component?.variant === 'carousel' ? (
    <CarouselComponent {...props} />
  ) : (
    <ThreeItemGridComponent {...props} />
  );
};
