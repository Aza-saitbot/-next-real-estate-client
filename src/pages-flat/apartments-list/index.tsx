import React from 'react';
import s from './styles.module.scss';
import {ApartmentsListProps} from "@/pages-flat/types";
import Pagination from "@/shared/ui/Pagination";
import ApartmentsList from "@/entities/apartment/ui/apartments-list";
import {PER_PAGE} from "@/shared/ui/Pagination/config";
import {useTranslation} from "next-i18next";
import EmptyList from "@/shared/ui/EmptyList/EmptyList";

const ApartmentsListPage = ({apartments,total,currentPage}:ApartmentsListProps) => {
    const { t } = useTranslation()
    const isEmpty = !apartments

    if (isEmpty){
        return <EmptyList text='Скоро на сайте появится информация о недвижимости' />
    }

    return (
        <div>
            <h1>Page {currentPage}</h1>
            {t('yes')}
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