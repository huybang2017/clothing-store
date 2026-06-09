'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Eye, Heart, Sparkles } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { vi } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const links = [
  { href: ROUTES.company.ourStory, label: vi.company.nav.ourStory, icon: BookOpen },
  { href: ROUTES.company.vision, label: vi.company.nav.vision, icon: Eye },
  { href: ROUTES.company.mission, label: vi.company.nav.mission, icon: Heart },
  { href: ROUTES.company.coreValues, label: vi.company.nav.coreValues, icon: Sparkles },
] as const;

export function CompanyNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue-600">
        {vi.company.sectionTitle}
      </p>
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
            )}
          >
            <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-blue-600' : 'text-slate-400')} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
