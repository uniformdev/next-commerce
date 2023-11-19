'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NavItem } from '../navbar/props';

const FooterMenuItem = ({ item }: { item: NavItem }) => {
  const path = item?.fields?.link?.value?.path;
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === path);

  useEffect(() => {
    setActive(pathname === path);
  }, [pathname, path]);

  return (
    <li>
      <Link
        href={path ?? '#'}
        className={clsx(
          'block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm',
          {
            'text-black dark:text-neutral-300': active
          }
        )}
      >
        {item?.fields?.title?.value}
      </Link>
    </li>
  );
};

export default function FooterMenu({ menu }: { menu: Array<NavItem> }) {
  return (
    <nav>
      <ul>
        {menu.map((item: NavItem) => {
          return <FooterMenuItem key={item?.fields?.title?.value} item={item} />;
        })}
      </ul>
    </nav>
  );
}
