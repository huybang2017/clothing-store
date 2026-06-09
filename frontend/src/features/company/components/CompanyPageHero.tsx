interface CompanyPageHeroProps {
  title: string;
  subtitle: string;
}

export function CompanyPageHero({ title, subtitle }: CompanyPageHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 px-6 py-10 text-white shadow-sm sm:px-10 sm:py-12">
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-white/10" />
      <div className="relative">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-blue-50 sm:text-base">{subtitle}</p>
      </div>
    </div>
  );
}
