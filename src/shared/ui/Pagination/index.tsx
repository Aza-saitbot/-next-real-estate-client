import Link from 'next/link'
import React from 'react'
import usePagination from "@/shared/ui/Pagination/lib";
import {dotts} from "@/shared/ui/Pagination/config";
import s from './pagination.module.scss'

export type PaginationProps = {
    totalItems: number
    currentPage: number
    renderPageLink: (page: number) => string
    itemsPerPage: number
}


const Pagination = ({
                        totalItems,
                        currentPage,
                        itemsPerPage = 10,
                        renderPageLink,
                    }: PaginationProps) => {
    const pages = usePagination(totalItems, currentPage, itemsPerPage)

    return (
        <div className={s.pagination}>
            {pages.map((pageNumber, i) => pageNumber === dotts
                ? <div className={s.pageNumber} key={i}>{pageNumber}</div>
                : <Link key={i} href={renderPageLink(pageNumber as number)}
                        className={pageNumber === currentPage ? s.currentPage : s.pageNumber}>
                    {pageNumber}
                </Link>
            )}
        </div>
    )
}

export default Pagination
