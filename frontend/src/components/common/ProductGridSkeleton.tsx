import { Skeleton } from '@/components/ui/skeleton';
import {
  productGridClass,
  productGridWithSidebarClass,
} from '@/lib/product-grid';

type ProductGridLayout = 'full' | 'sidebar';

export function ProductGridSkeleton({
  count = 4,
  layout = 'full',
}: {
  count?: number;
  layout?: ProductGridLayout;
}) {
  const gridClass = layout === 'sidebar' ? productGridWithSidebarClass : productGridClass;

  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-border-subtle bg-white">
          <Skeleton className="aspect-[4/5] w-full rounded-none" />
          <div className="space-y-1.5 p-2.5 sm:p-3">
            <Skeleton className="h-3 w-4/5 sm:h-3.5" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
