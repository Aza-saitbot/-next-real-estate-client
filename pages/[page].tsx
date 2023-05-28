import React from 'react';
import {ApartmentsPageProps} from "@/shared/api/apartments/types";
import {GetStaticPaths} from "next";
import {PER_PAGE} from "@/shared/ui/Pagination/config";
import {wrapper} from "@/app/store/store";
import Head from "next/head";
import ApartmentsListPage from "@/pages-flat/apartments-list";
import Header from "@/widgets/Header";
import * as api from "@/shared/api";

function PaginatedPage(props: ApartmentsPageProps) {
    return (
        <div>
            <Head>
                <title>Page {props.currentPage} - SSG Pagination Example</title>
                <meta
                    name="description"
                    content={`Statically generated page ${props.currentPage}`}
                />
            </Head>
            <Header/>
            <ApartmentsListPage {...props} />
        </div>
    )
}

export const getStaticProps = wrapper.getStaticProps(async ({store, params}) => {
    try {
        const page = Number(params?.page) || 1
        const payload = await api.apartments.getApartments({limit: PER_PAGE, page})

        if (!payload.apartments.length) {
            return {
                notFound: true,
            }
        }
        if (page === 1) {
            return {
                redirect: {
                    destination: '/',
                    locale:true,
                    permanent: false,
                },
            }
        }

        return {
            props: {
                ...payload,
                currentPage: page,
            },
            revalidate: 60 * 60 * 24, // <--- ISR cache: once a day
        }
    } catch (err) {}

    return {
        props: {},
        redirect: {
            destination: '/',
            locale:true,
            permanent: false,
        }
    };
});


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    return {
         paths: Array.from({length: 5}).map((_, i) => `/${i + 2}`),
        // Block the request for non-generated pages-flat and cache them in the background
        fallback: 'blocking',
    }
}


export default PaginatedPage
