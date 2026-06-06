'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
    limit: 15,
  });
  const products = data?.data ?? [];

  return (
    <div>
      <section className="relative overflow-hidden bg-sky-100">
        <div className="relative aspect-[21/9] min-h-[16rem] w-full sm:min-h-[20rem] md:aspect-[2.4/1]">
          <img
            src="/images/hero-banner.jpg"
            alt={vi.home.heroTitle}
            className="h-full w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/80 to-transparent sm:h-20" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-6 right-4 sm:bottom-8 sm:right-8"
        >
          <Link href={ROUTES.shop}>
            <Button
              size="lg"
              className="gap-2 bg-white text-blue-600 shadow-lg ring-1 ring-blue-100 hover:bg-blue-50"
            >
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
