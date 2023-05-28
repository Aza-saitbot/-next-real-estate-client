import React from 'react';
import {Store} from "@reduxjs/toolkit";
import {RootState} from "@/app/store/types";
import {AnyAction} from "redux";
import {GetStaticPropsContext} from "next";
import {wrapper} from "@/app/store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Header from "@/widgets/Header";
import Alert from "@/shared/ui/Alert/Alert";
import AuthPage from "@/pages-flat/auth/AuthPage";

const Auth = (props:any) => <>
    <Alert {...props}/>
    <Header {...props} />
    <AuthPage {...props} />
</>

export default Auth;

export type ContextType = { store: Store<RootState, AnyAction> } & GetStaticPropsContext

export const getServerSideProps = wrapper.getServerSideProps(async (ctx: ContextType) => {
    try {
        if (ctx?.locale) {
            const props = {...(await serverSideTranslations(ctx.locale, ['common']))}
            return {
                props
            };
        }
    } catch (err) {
    }

    return {props: {}};
});