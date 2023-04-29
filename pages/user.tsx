import React from 'react';
import {Store} from "@reduxjs/toolkit";
import {RootState} from "@/app/store/types";
import {AnyAction} from "redux";
import {GetServerSidePropsContext} from "next";
import {wrapper} from "@/app/store/store";
import * as api from "@/shared/api";

const User = () => {
    return (
        <div>
            User
        </div>
    );
};

export type GetServerSidePropsType = {store: Store<RootState, AnyAction>} & GetServerSidePropsContext & any
export const getServerSideProps = wrapper.getServerSideProps(async (ctx:GetServerSidePropsType) => {
    const authProps = await api.checkAuth(ctx)
    if ("redirect" in authProps) {
        return authProps
    }

    return {
        props: {}
    }

})

export default User;