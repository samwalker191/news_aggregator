import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "./shadcn/pagination";

export default function ArticlePagination({ page, handlePageSet, total }: {page: number, handlePageSet: Function, total: number}) {
    const hasMore = total - (page * 20) > 20;
    const totalPages = Math.ceil(total / 20);

    const pageButtons = [page];
    let i = page + 1;
    let j = page - 1;
    while (pageButtons.length < 4 && pageButtons.length < totalPages) {
        if (i < totalPages)
            pageButtons.push(i);
        if (j >= 1)
            pageButtons.unshift(j);

        i++;
        j--;
    }

    return (
        <Pagination className="mb-6">
            <PaginationContent>
                {page > 0 && 
                    <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageSet(page - 1)} />
                    </PaginationItem>
                }
                
                {pageButtons.map(p => {
                    return (
                        <PaginationItem key={p}>
                            <PaginationLink onClick={() => handlePageSet(p)} isActive={page === p}>{p+1}</PaginationLink>
                        </PaginationItem>
                    )
                })}
                
                {hasMore &&
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationNext onClick={() => handlePageSet(page + 1)} />
                        </PaginationItem>
                    </>
                }
            </PaginationContent>
        </Pagination>
    )
}