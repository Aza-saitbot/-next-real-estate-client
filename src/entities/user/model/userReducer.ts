import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {IUser} from "@/shared/api/models";
import {RootState} from "@/app/store/types";
import {setCookie} from 'nookies'
import * as api from "@/shared/api";
import {getDecodedAccessToken} from "@/shared/api/user/lib";
import {CreateUserType} from "@/shared/api/user/model";


export const createUser = createAsyncThunk<IUser, CreateUserType, { rejectValue: number }>(
    'user/createUser', async (requestOptions, {rejectWithValue,dispatch}) => {
        try {
            const {token} = await api.auth.login(requestOptions)
            setCookie(null,"_token",token,{
                path:'/'
            })
            const user = getDecodedAccessToken(token)
            dispatch(setUserData(user))
            return user
        } catch (e:any) {
            // const message:string = e.response.data.message ? e.response.data.message : 'Не удалось создать пользователя'
            // dispatch(addAlertWithCustomText({
            //     message:message,
            //     color:'error'
            // }))
            console.log('e.response.data.error_code',e.response.data.error_code)
            return rejectWithValue(e.response.data.error_code)
        }
    }
);

export type UserModelType = {
    user: IUser
}
const initialState: UserModelType = {
    user: null
}

const userModel = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
                state.user = action.payload.user.user
            })

    }
});


export const {setUserData} = userModel.actions;
export const userReducer = userModel.reducer;