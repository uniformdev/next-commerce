import clsx from 'clsx';
import Image from 'next/image';

export default function LogoSquare({ logo, size }: { size?: 'sm' | undefined; logo: any }) {
  let logoSrc = logo?.[0]?.fields?.url?.value;
  if (!logoSrc) {
    logoSrc = '/nextcommerce.svg';
  }
  return (
    <div
      className={clsx(
        'flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black',
        {
          'h-[40px] w-[40px] rounded-xl': !size,
          'h-[30px] w-[30px] rounded-lg': size === 'sm'
        }
      )}
    >
      <Image
        src={logoSrc}
        className={clsx({
          'h-[16px] w-[16px]': !size,
          'h-[10px] w-[10px]': size === 'sm'
        })}
        width={size === 'sm' ? 10 : 16}
        height={size === 'sm' ? 10 : 16}
        alt="Next Commerce"
        loading="eager"
      />
    </div>
  );
}
