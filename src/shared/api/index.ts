import axios from 'axios';
// import Cookies from 'nookies';
// import { parseCookies } from 'nookies';
import {UserApi} from "@/shared/api/user-api/UserApi";
import {ApartmentApi} from "@/shared/api/apartments-api/ApartmentApi";
import {Store} from "@reduxjs/toolkit";
import {RootState} from "@/app/store/types";
import {AuthApi} from "@/shared/api/auth-api/AuthApi";

// const cookies = parseCookies();

type ApiReturnType =
    ReturnType<typeof UserApi>
    & ReturnType<typeof ApartmentApi>
    & ReturnType<typeof AuthApi>


export const Api = (ctx: Store<RootState>): ApiReturnType => {
    // const cookies = Cookies.get(ctx);
    // const token = cookies.token;

    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        // headers: {
        //     Authorization: 'Bearer ' + token,
        // },
    });

    return [UserApi, ApartmentApi].reduce((prev, f) => ({ ...prev, ...f(instance) }), {} as ApiReturnType);
}