import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { vi } from '@/lib/i18n';

const shopLinks = [
  { href: ROUTES.home, label: vi.nav.home },
  { href: ROUTES.shop, label: vi.nav.shop },
  { href: ROUTES.shop, label: vi.footer.allProducts },
];

const accountLinks = [
  { href: ROUTES.auth.login, label: vi.common.signIn },
  { href: ROUTES.auth.register, label: vi.common.register },
  { href: ROUTES.cart, label: vi.nav.cart },
];

const aboutLinks = [
  { href: ROUTES.company.ourStory, label: vi.company.nav.ourStory },
  { href: ROUTES.company.vision, label: vi.company.nav.vision },
  { href: ROUTES.company.mission, label: vi.company.nav.mission },
  { href: ROUTES.company.coreValues, label: vi.company.nav.coreValues },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-blue-100 bg-gradient-to-b from-white to-sky-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href={ROUTES.home} className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-sm font-semibold text-white shadow-sm">
                C
              </span>
              <span className="text-lg font-semibold text-slate-900">{vi.brand.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              {vi.brand.tagline}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              {vi.footer.shop}
            </h3>
            <nav className="mt-4 flex flex-col gap-2.5">
              {shopLinks.map(({ href, label }) => (
                <Link
                  key={`${href}-${label}`}
                  href={href}
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              {vi.footer.account}
            </h3>
            <nav className="mt-4 flex flex-col gap-2.5">
              {accountLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              {vi.footer.about}
            </h3>
            <nav className="mt-4 flex flex-col gap-2.5">
              {aboutLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              {vi.footer.contact}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <a
                  href={`mailto:${vi.footer.email}`}
                  className="transition-colors hover:text-blue-600"
                >
                  {vi.footer.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <span>{vi.footer.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <span>{vi.footer.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6">
          <p className="text-xs text-blue-50">
            © {new Date().getFullYear()} {vi.brand.copyright}
          </p>
          <p className="text-xs text-blue-100">{vi.footer.crafted}</p>
        </div>
      </div>
    </footer>
  );
}
