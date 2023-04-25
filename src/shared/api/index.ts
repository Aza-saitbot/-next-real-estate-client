import axios from 'axios';
import Cookies,{ parseCookies } from 'nookies';
import {UserApi} from "@/shared/api/user-api/UserApi";
import {ApartmentApi} from "@/shared/api/apartments-api/ApartmentApi";
import {Store} from "@reduxjs/toolkit";
import {RootState} from "@/app/store/types";

 const cookies = parseCookies();

type ApiReturnType =
    ReturnType<typeof UserApi>
    & ReturnType<typeof ApartmentApi>


export const Api = (ctx?: any): ApiReturnType => {
    const cookies = Cookies.get(ctx);
    const token = cookies.token;

    const headers = token ? {Authorization: 'Bearer ' + token }: {};
console.log('headers',headers)
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers
    });

    return [UserApi, ApartmentApi].reduce((prev, f) => ({ ...prev, ...f(instance) }), {} as ApiReturnType);
}