import React from 'react';
import s from './styles.module.scss';
import {ApartmentsListProps} from "@/pages-flat/types";
import Pagination from "@/shared/ui/Pagination";
import ApartmentsList from "@/entities/apartment/ui/apartments-list";
import {PER_PAGE} from "@/shared/ui/Pagination/config";

const ApartmentsListPage = ({apartments,total,currentPage}:ApartmentsListProps) => {
    return (
        <div>
            <h1>Page {currentPage}</h1>
            <Pagination
                totalItems={total}
                currentPage={currentPage}
                itemsPerPage={PER_PAGE}
                renderPageLink={(page) => `/${page}`}
            />
            <ApartmentsList apartments={apartments}/>
        </div>
    );
};

export default ApartmentsListPage;