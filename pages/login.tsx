import React from 'react';
import LoginPage from "@/pages-flat/login";
import Alert from "@/shared/ui/Alert/Alert";
import {Store} from "@reduxjs/toolkit";
import {RootState} from "@/app/store/types";
import {AnyAction} from "redux";
import {GetStaticPropsContext} from "next";
import {wrapper} from "@/app/store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Login = (props:any) => <>
    <Alert {...props}/>
    <LoginPage {...props}/>
</>

export default Login;

export type ContextType = {store: Store<RootState, AnyAction> } & GetStaticPropsContext

export const getStaticProps = wrapper.getStaticProps(async (ctx:ContextType) => {
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