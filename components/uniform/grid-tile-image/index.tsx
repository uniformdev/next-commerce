import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import clsx from 'clsx';
import Label from 'components/label';
import Image from 'next/image';
import Link from 'next/link';
import { GridTileImageParameters } from './props';

export const GridTileImageComponent = (props: ComponentProps<GridTileImageParameters>) => {
  return <GridTileImage {...props} />;
};

export const GridTileImage = ({
  name = '',
  price = '',
  image,
  url,
  isInteractive = false,
  active = false,
  full = false
}: GridTileImageParameters) => {
  const position = full ? 'center' : 'bottom';

  const innerTile = (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
        {
          relative: true,
          'border-2 border-blue-600': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
      {image ? (
        <Image
          className={clsx('relative h-full w-full object-contain', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          src={image}
          alt={name}
          fill
          sizes={full ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
          priority={false}
        />
      ) : null}
      {name ? <Label title={name} amount={price} currencyCode={'USD'} position={position} /> : null}
    </div>
  );
  return url?.path ? <Link href={url?.path}>{innerTile}</Link> : innerTile;
};
