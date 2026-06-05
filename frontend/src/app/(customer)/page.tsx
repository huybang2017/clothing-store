'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/common/ProductCard';
import { ProductGridSkeleton } from '@/components/common/ProductGridSkeleton';
import { productGridClass } from '@/lib/product-grid';
import { useGetProductsQuery } from '@/store/api/productApi';
import { vi } from '@/lib/i18n';
import { ROUTES } from '@/constants/routes';

export default function HomePage() {
  const { data, isLoading } = useGetProductsQuery({
    isFeatured: true,
    status: 'active',
    limit: 12,
  });
  const products = data?.data ?? [];

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 px-4 py-20 sm:py-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-7xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white backdrop-blur">
            <Sparkles className="h-4 w-4" />
            {vi.home.badge}
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl md:leading-[1.1]">
            {vi.home.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">{vi.home.heroSubtitle}</p>
          <Link href={ROUTES.shop} className="mt-10 inline-block">
            <Button size="lg" className="gap-2 bg-white text-blue-600 shadow-lg hover:bg-white/95">
              {vi.home.shopCollection}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              {vi.home.featured}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{vi.home.featuredDesc}</p>
          </div>
          <Link
            href={ROUTES.shop}
            className="hidden text-sm font-medium text-blue-600 hover:underline sm:block"
          >
            {vi.home.viewAll}
          </Link>
        </div>
        {isLoading ? (
          <ProductGridSkeleton count={12} />
        ) : (
          <div className={productGridClass}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
