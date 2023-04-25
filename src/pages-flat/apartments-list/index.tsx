import React from 'react';
import s from './styles.module.scss';
import {ApartmentsListProps} from "@/pages-flat/types";
import Pagination from "@/shared/ui/Pagination";
import ApartmentsList from "@/entities/apartment/ui/apartments-list";
import {PER_PAGE} from "@/shared/ui/Pagination/config";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";

const ApartmentsListPage = ({apartments,total,currentPage}:ApartmentsListProps) => {
    const { t,i18n } = useTranslation()
    const router = useRouter()
    return (
        <div>
            <form action="" >
                <select name="local" id="local" onChange={event => router.push('/','/',{locale:event.target.value})} >
                    <option value="en">English</option>
                    <option value="tr">Turkish</option>
                    <option value="ru">Russia</option>
                </select>
                <button type='submit'>Поменять язык</button>
            </form>
            {t('yes')}
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