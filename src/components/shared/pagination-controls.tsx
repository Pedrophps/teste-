"use client";

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

export default function PaginationControls({ currentPage, totalPages, className }: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = useCallback((pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }, [pathname, searchParams]);

  const pageNumbers = [];
  // Logic to create pagination numbers, e.g. [1, '...', 4, 5, 6, '...', 10]
  // For simplicity, we'll show a few pages around the current one.
  const pagesToShow = 2;
  let startPage = Math.max(1, currentPage - pagesToShow);
  let endPage = Math.min(totalPages, currentPage + pagesToShow);

  if (currentPage - 1 <= pagesToShow) {
    endPage = Math.min(totalPages, 1 + pagesToShow * 2);
  }
  if (totalPages - currentPage <= pagesToShow) {
    startPage = Math.max(1, totalPages - pagesToShow * 2);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {startPage > 1 && (
            <>
                <PaginationItem>
                    <PaginationLink href={createPageURL(1)}>1</PaginationLink>
                </PaginationItem>
                {startPage > 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
            </>
        )}

        {pageNumbers.map(page => (
          <PaginationItem key={page}>
            <PaginationLink href={createPageURL(page)} isActive={currentPage === page}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {endPage < totalPages && (
            <>
                {endPage < totalPages - 1 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                <PaginationItem>
                    <PaginationLink href={createPageURL(totalPages)}>{totalPages}</PaginationLink>
                </PaginationItem>
            </>
        )}

        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
