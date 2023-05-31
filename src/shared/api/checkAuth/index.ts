import nookies from "nookies";
import axios from "@/shared/api/core/axios";
import * as api from "@/shared/api";
import {setUserData} from "@/entities/user/model/userReducer";
import {GetServerSidePropsType} from "@/shared/types/types";

export const checkAuth = async (ctx:GetServerSidePropsType) => {
    const {_token} = nookies.get(ctx)
    const {store,locale} = ctx

    axios.defaults.headers.Authorization = 'Bearer ' + _token

    try {
        const {roles,...userProps} = await api.user.getMe()
        const rolesData = roles ? roles.map(({value}) => value) : []
        store.dispatch(setUserData({...userProps, roles:rolesData}))
        return {
            props:{}
        }
    }catch (e) {
        return {
            redirect: {
                destination:`${locale}/auth`,
                locale:true,
                permanent: false
            }
        }
    }
}