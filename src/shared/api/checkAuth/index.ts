import nookies from "nookies";
import axios from "@/shared/api/core/axios";
import * as api from "@/shared/api";
import {GetServerSidePropsType} from "../../../../pages/admin";
import {setUserData} from "@/entities/user/model/userReducer";

export const checkAuth = async (ctx:GetServerSidePropsType) => {
    const {_token} = nookies.get(ctx)
    axios.defaults.headers.Authorization = 'Bearer ' + _token
    try {
        const {roles,...userProps} = await api.user.getMe()
        const rolesData = roles ? roles.map(({value}) => value) : []
        ctx.store.dispatch(setUserData({...userProps, roles:rolesData}))
        return {
            props:{}
        }
    }catch (e) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
}