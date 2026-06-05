import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { vi } from '@/lib/i18n';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6">
        <div className="text-center sm:text-left">
          <p className="font-semibold text-slate-900">{vi.brand.name}</p>
          <p className="mt-1 text-sm text-slate-600">{vi.brand.tagline}</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
          <Link href={ROUTES.shop} className="transition-colors hover:text-blue-600">
            {vi.nav.shop}
          </Link>
          <Link href={ROUTES.auth.login} className="transition-colors hover:text-blue-600">
            {vi.common.signIn}
          </Link>
        </nav>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} {vi.brand.copyright}
        </p>
      </div>
    </footer>
  );
}
