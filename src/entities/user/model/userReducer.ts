import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {IUser} from "@/shared/api/models";
import {RootState} from "@/app/store/types";
import * as api from "@/shared/api";
import {AuthResponseDTO, AuthUserDTO} from "@/shared/api/auth/dto/auth-dto";
import {setCookie} from "nookies";


export type UserModelType = {
    user: IUser
}
const initialState: UserModelType = {
    user: null
}

export const authThunk = createAsyncThunk<AuthResponseDTO, AuthUserDTO, { rejectValue: number; }>(
    'user/authThunk', async (requestOptions, { rejectWithValue }) => {
        try {
            return await api.auth.toggle(requestOptions)
        } catch (e:any) {
            return rejectWithValue(e.response.data.error_code)
        }
    }
);

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
        builder.addCase(authThunk.fulfilled, (state, action: PayloadAction<AuthResponseDTO>) => {
            setCookie(null, "_token", action.payload.token, {path: '/'})
        })
    }
});


export const {setUserData} = userModel.actions;
export const userReducer = userModel.reducer;