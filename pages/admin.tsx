import React from 'react';
import {wrapper} from "@/app/store/store";
import {GetServerSidePropsContext} from "next";
import {AnyAction} from "redux";
import {RootState} from "@/app/store/types";
import {Store} from "@reduxjs/toolkit";
import * as api from '@/shared/api';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import AdminPage from "@/pages-flat/admin";
import Header from "@/widgets/Header";


const Admin = () => {
    return (
        <>
           <Header/>
            <AdminPage/>
        </>
    );
};

export type GetServerSidePropsType = {store: Store<RootState, AnyAction>} & GetServerSidePropsContext & any
export const getServerSideProps = wrapper.getServerSideProps(async (ctx:GetServerSidePropsType) => {
    const authProps = await api.checkAuth(ctx)
    if ("redirect" in authProps) {
        return authProps
    }

    const payload = {...(await serverSideTranslations(ctx.locale, ['common']))}

    const isAdmin = ctx.store.getState().user.user.roles.includes('ADMIN')
    if (!isAdmin) {
        return {
            redirect: {
                destination: '/user',
                permanent: false
            },
            props:{
                ...payload
            }
        }
    }

    return {
        props: {
            props:{
                ...payload
            }
        }
    }

})

export default Admin