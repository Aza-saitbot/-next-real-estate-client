import React from 'react';
import {Store} from "@reduxjs/toolkit";
import {RootState} from "@/app/store/types";
import {AnyAction} from "redux";
import {GetStaticPropsContext} from "next";
import {wrapper} from "@/app/store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import RegisterPage from "@/pages-flat/register";
import Header from "@/widgets/Header";

const Register = (props:any) => <>
     <Header/>
    <RegisterPage {...props}/>
</>

export default Register;

export type ContextType = {store: Store<RootState, AnyAction> } & GetStaticPropsContext

export const getStaticProps = wrapper.getStaticProps(async (ctx:ContextType) => {
    try {
        if (ctx?.locale) {
            const props = {...(await serverSideTranslations(ctx.locale, ['common']))}
            return {
                props
            };
        }
    } catch (err) {}

    return {props: {}};
});