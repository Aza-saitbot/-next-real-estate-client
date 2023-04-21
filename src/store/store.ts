import {configureStore, Store} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {isDev} from "@/shared/consts/consts";
import {combineReducers} from "redux";
import {userReducer} from "@/entities/user/model/userReducer";
import {apartmentReducer} from "@/entities/apartment/model/apartmentReducer";
import {RootState} from "@/store/types";


const rootReducer = combineReducers({
  //  user: userReducer,
    apartment: apartmentReducer
});

export const makeStore = (): Store<RootState> =>configureStore({
    reducer: rootReducer
})


// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore, {debug: isDev});