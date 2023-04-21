import React from 'react';
import {ApartmentsPageProps} from "@/shared/api/apartments-api/types";
import ApartmentCard from "@/entities/apartment/ui/apartment-card";
import Pagination from "@/shared/ui/Pagination";
import ApartmentsList from "@/entities/apartment/ui/apartments-list";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import {PER_PAGE} from "@/shared/ui/Pagination/config";
import {Api} from "@/shared/api";
import {apartmentModel} from "@/entities/apartment/model/apartmentReducer";
import {wrapper} from "@/store/store";
import Head from "next/head";
import ApartmentsListPage from "@/pages-flat/apartments-list";
import Header from "@/widgets/Header";

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
        const payload = await Api(store).getApartments({limit: PER_PAGE, page})
        store.dispatch(apartmentModel.actions.setApartments(payload))

        if (!payload.apartments.length) {
            return {
                notFound: true,
            }
        }
        if (page === 1) {
            return {
                redirect: {
                    destination: '/',
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
            permanent: false,
        }
    };
});


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        // Prerender the next 5 pages-flat after the first page, which is handled by the index page.
        // Other pages-flat will be prerendered at runtime.
        paths: Array.from({length: 5}).map((_, i) => `/${i + 2}`),
        // Block the request for non-generated pages-flat and cache them in the background
        fallback: 'blocking',
    }
}


export default PaginatedPage
