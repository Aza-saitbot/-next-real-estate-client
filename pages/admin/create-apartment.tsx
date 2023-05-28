import React from 'react';
import {Store} from "@reduxjs/toolkit";
import {RootState} from "@/app/store/types";
import {AnyAction} from "redux";
import {GetServerSidePropsContext} from "next";
import {wrapper} from "@/app/store/store";
import * as api from "@/shared/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {getCategoriesEmployees} from "@/shared/api/apartments/getCategoriesEmployees";
import Alert from "@/shared/ui/Alert/Alert";
import CreateApartmentPage from "@/pages-flat/create-apartment/CreateApartmentPage";
import Header from "../../src/widgets/Header";
import {GetServerSidePropsType} from "@/shared/types/types";

const CreateApartment = () => {
    return (
        <>
            <Alert/>
            <Header/>
            <CreateApartmentPage/>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx: GetServerSidePropsType) => {
    const authProps = await api.checkAuth(ctx)

    if ("redirect" in authProps) {
        return authProps
    }
    const translationObj = {...(await serverSideTranslations(ctx.locale, ['common']))}
    const isAdmin = ctx.store.getState().user.user.roles.includes('ADMIN')
    if (!isAdmin) {
        return {
            redirect: {
                destination: `/${ctx.locale}/user`,
                locale: true,
                permanent: false
            },
            props: {...translationObj}
        }
    }

    await getCategoriesEmployees(ctx)

    return {
        props: {...translationObj}
    }
})

export default CreateApartment;