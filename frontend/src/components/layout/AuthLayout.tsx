import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { vi } from '@/lib/i18n';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Link href={ROUTES.home} className="text-xl font-semibold tracking-tight text-white">
          {vi.brand.name}
        </Link>
        <div className="max-w-md">
          <h2 className="text-3xl font-semibold leading-tight text-white">
            {vi.auth.heroTitle}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            {vi.auth.heroSubtitle}
          </p>
        </div>
        <p className="text-xs text-white/60">
          © {new Date().getFullYear()} {vi.brand.name}
        </p>
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="flex w-full flex-col justify-center bg-slate-50 px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mb-8 lg:hidden">
          <Link href={ROUTES.home} className="text-xl font-semibold text-blue-600">
            {vi.brand.name}
          </Link>
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
