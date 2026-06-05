import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { stockBadge } from '@/lib/design';
import { formatPriceRange, formatVND, vi } from '@/lib/i18n';
import { getProductThumbnail } from '@/lib/product-images';
import { COLOR_SWATCHES } from '@/lib/variants';
import type { Product } from '@/types/api';
import { ROUTES } from '@/constants/routes';

interface ProductCardProps {
  product: Product;
  showStock?: boolean;
  showSale?: boolean;
}

export function ProductCard({
  product,
  showStock = false,
  showSale = false,
}: ProductCardProps) {
  const priceMin = product.priceMin ?? product.price;
  const priceMax = product.priceMax ?? product.price;
  const stock = stockBadge(product.stock);
  const onSale =
    showSale &&
    product.comparePrice != null &&
    product.comparePrice > priceMin;
  const colors = product.availableColors ?? [];
  const sizes = product.availableSizes ?? [];
  const thumbnail = getProductThumbnail(product);

  return (
    <Link href={ROUTES.product(product.slug)} className="group block h-full">
      <Card className="h-full overflow-hidden border-border-subtle transition-all duration-300 group-hover:shadow-[var(--shadow-md)]">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {onSale && (
              <Badge variant="danger" className="px-1.5 py-0 text-[10px] shadow-sm">
                {vi.shop.sale}
              </Badge>
            )}
            {product.isFeatured && (
              <Badge variant="default" className="px-1.5 py-0 text-[10px] shadow-sm">
                {vi.home.featuredBadge}
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-2.5 sm:p-3">
          <h3 className="line-clamp-2 text-xs font-medium leading-snug text-slate-900 transition-colors group-hover:text-blue-600 sm:text-sm">
            {product.name}
          </h3>
          <div className="mt-1.5 flex items-start justify-between gap-1.5">
            <div className="min-w-0 flex flex-wrap items-baseline gap-1">
              <span className="text-xs font-semibold text-slate-900">
                {product.hasVariants || priceMin !== priceMax
                  ? formatPriceRange(priceMin, priceMax)
                  : formatVND(priceMin)}
              </span>
              {product.comparePrice && (
                <span className="text-[10px] text-slate-400 line-through">
                  {formatVND(product.comparePrice)}
                </span>
              )}
            </div>
            {showStock && (
              <Badge variant={stock.variant} className="shrink-0 px-1.5 py-0 text-[10px]">
                {stock.label}
              </Badge>
            )}
          </div>
          {(colors.length > 0 || sizes.length > 0) && (
            <div className="mt-2 space-y-1.5 border-t border-slate-100 pt-2">
              {colors.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-500">{vi.shop.color}:</span>
                  <div className="flex flex-wrap gap-0.5">
                    {colors.slice(0, 5).map((c) => (
                      <span
                        key={c}
                        title={c}
                        className="h-3 w-3 rounded-full border border-black/10"
                        style={{
                          backgroundColor: COLOR_SWATCHES[c] ?? '#cbd5e1',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {sizes.length > 0 && (
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-[10px] text-slate-500">{vi.shop.size}:</span>
                  {sizes.slice(0, 5).map((s) => (
                    <span
                      key={s}
                      className="rounded border border-slate-200 px-1 py-px text-[9px] font-medium text-slate-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
