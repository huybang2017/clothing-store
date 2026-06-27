import type { Metadata } from 'next';
import { CompanyPageHero } from '@/features/company/components/CompanyPageHero';
import { Gem, Shield } from 'lucide-react';
import { vi } from '@/lib/i18n';

const vision = vi.company.vision;
const mission = vi.company.mission;

const missionIcons = [Gem, Shield] as const;

export const metadata: Metadata = {
  title: `${vision.title} & ${mission.title} | ${vi.brand.name}`,
  description: vision.subtitle,
};

export default function VisionPage() {
  return (
    <div className="space-y-10">
      <CompanyPageHero title={vision.title} subtitle={vision.subtitle} />

      <p className="text-base leading-relaxed text-slate-700">{vision.paragraph}</p>

      <section>
        <h2 className="mb-6 text-lg font-semibold text-slate-900">{mission.title}</h2>
        <div className="space-y-4">
          {mission.commitments.map(({ title, description }, index) => {
            const Icon = missionIcons[index] ?? Gem;
            return (
              <div
                key={title}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
