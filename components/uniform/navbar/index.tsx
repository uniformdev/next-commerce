import Link from 'next/link';
import { Suspense } from 'react';

import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import Search from 'components/layout/navbar/search';
import LogoSquare from 'components/logo-square';
import MobileMenu from 'components/uniform/navbar/mobile-menu';
import { NavItem, Parameters, Slots } from './props';

export const NavBarComponent = ({ siteName, logo, menu }: ComponentProps<Parameters, Slots>) => {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/2">
          <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            <LogoSquare logo={logo} />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {siteName}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: NavItem) => (
                <li key={item?.fields?.title?.value}>
                  <Link
                    href={item?.fields?.link?.value?.path || '#'}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item?.fields?.title?.value}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/4">
          <Search />
        </div>
        <div className="flex justify-end md:w-1/4">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};
