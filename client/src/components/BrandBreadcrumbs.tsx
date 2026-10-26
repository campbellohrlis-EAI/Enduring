// ENDURING ADVANTAGE, Brand breadcrumbs
// Design reminder: navy-and-gold editorial system with low-friction internal linking.

import { Fragment } from 'react';
import { Link } from 'wouter';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export type BreadcrumbEntry = {
  label: string;
  href?: string;
};

export default function BrandBreadcrumbs({ items, inverse = false }: { items: BreadcrumbEntry[]; inverse?: boolean }) {
  const linkColour = inverse ? 'rgba(250,247,242,0.55)' : 'rgba(13,51,73,0.58)';
  const pageColour = inverse ? '#FAF7F2' : '#0D3349';
  const separatorColour = inverse ? 'rgba(250,247,242,0.28)' : 'rgba(13,51,73,0.25)';

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-1.5 sm:gap-2" style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem' }}>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 && <BreadcrumbSeparator style={{ color: separatorColour }} />}
              <BreadcrumbItem>
                {isCurrent || !item.href ? (
                  <BreadcrumbPage className="max-w-[15rem] truncate" style={{ color: pageColour, fontWeight: 600 }} title={item.label}>
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild style={{ color: linkColour, textDecoration: 'none' }}>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
