import { ComponentProps, UniformRichText } from '@uniformdev/canvas-next-rsc/component';
import LogoSquare from 'components/logo-square';
import FooterMenu from 'components/uniform/footer/footer-menu';
import Image from 'next/image';
import Link from 'next/link';
import { Parameters, Slots } from './props';

export const FooterComponent = ({
  component,
  siteName,
  logo,
  ctaLink,
  ctaImage,
  ctaTitle,
  menu
}: ComponentProps<Parameters, Slots>) => {
  const ctaImageSrc = ctaImage?.[0]?.fields?.url?.value;
  // const currentYear = new Date().getFullYear();
  // const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div>
          <Link className="flex items-center gap-2 text-black dark:text-white md:pt-1" href="/">
            <LogoSquare logo={logo} size="sm" />
            <span className="uppercase">{siteName}</span>
          </Link>
        </div>
        <FooterMenu menu={menu} />
        <div className="md:ml-auto">
          <a
            className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white"
            aria-label="Deploy on Vercel"
            href={ctaLink?.path}
          >
            {ctaImageSrc ? (
              <span className="px-3">
                <Image src={ctaImageSrc} alt={siteName} width={16} height={16} loading="lazy" />
              </span>
            ) : null}
            <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
            <span className="px-3">{ctaTitle}</span>
          </a>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <UniformRichText parameterId="footerText" component={component} />
        </div>
      </div>
    </footer>
  );
};
