'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingBag, LogOut, User, LayoutGrid } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { useGetCartQuery } from '@/store/api/cartApi';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/store/slices/authSlice';
import { vi } from '@/lib/i18n';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: ROUTES.home, label: vi.nav.home },
  { href: ROUTES.shop, label: vi.nav.shop },
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isAuthenticated, user, isAdmin } = useAuth();
  const { data: cartData } = useGetCartQuery(undefined, {
    skip: !mounted || !isAuthenticated,
  });
  const itemCount = cartData?.data?.itemCount ?? 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push(ROUTES.home);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={ROUTES.home}
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm text-white">
            C
          </span>
          {vi.brand.name}
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
              )}
            >
              {label}
            </Link>
          ))}
          {mounted && isAuthenticated && (
            <>
            <Link
              href={ROUTES.account.orders}
              className={cn(
                'hidden rounded-lg px-3 py-2 text-sm font-medium transition-colors md:block',
                pathname.startsWith('/tai-khoan')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
              )}
            >
              {vi.order.myOrders}
            </Link>
            <Link
              href={ROUTES.cart}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === ROUTES.cart
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
              )}
            >
              {vi.nav.cart}
            </Link>
            </>
          )}
          {isAdmin && (
            <Link
              href={ROUTES.admin.dashboard}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              <LayoutGrid className="h-4 w-4" />
              {vi.nav.admin}
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {mounted && isAuthenticated && (
            <Link href={ROUTES.cart} className="relative md:hidden">
              <Button variant="ghost" size="icon" aria-label={vi.nav.cart}>
                <ShoppingBag className="h-4 w-4" />
              </Button>
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>
          )}
          {mounted && isAuthenticated ? (
            <>
              <span className="hidden items-center gap-1.5 text-sm text-slate-600 sm:flex">
                <User className="h-4 w-4" />
                {user?.fullName}
              </span>
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label={vi.common.signOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link href={ROUTES.auth.register} className="hidden sm:block">
                <Button variant="outline" size="sm">
                  {vi.common.register}
                </Button>
              </Link>
              <Link href={ROUTES.auth.login}>
                <Button size="sm">{vi.common.signIn}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
