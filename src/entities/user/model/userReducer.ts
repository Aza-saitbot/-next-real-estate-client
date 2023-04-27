import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {IUser} from "@/shared/api/models";
import {RootState} from "@/app/store/types";

import {Api} from "@/shared/api";
import {getDecodedAccessToken} from "@/shared/api/user-api/lib";
import {CreateUserType, ReturnTokenType} from "@/shared/api/user-api/model";
import {addAlertWithCustomText} from "@/shared/ui/Alert/alertReducer";


export const createUser = createAsyncThunk<IUser, CreateUserType, { rejectValue: string }>(
    'user/createUser', async (requestOptions, {rejectWithValue,dispatch}) => {
        try {
            const {data: {token}} = await Api().createUser(requestOptions)
            const user = getDecodedAccessToken(token)
            dispatch(setUserData(user))
            return user
        } catch (e:any) {
            const message:string = e.response.data.message ? e.response.data.message : 'Не удалось создать пользователя'
            dispatch(addAlertWithCustomText({
                message:message,
                color:'error'
            }))
            return rejectWithValue(message)
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