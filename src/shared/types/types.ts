import {Store} from "@reduxjs/toolkit";
import {RootState} from "@/app/store/types";
import {AnyAction} from "redux";
import {GetServerSidePropsContext} from "next";

export type GetServerSidePropsType = {store: Store<RootState, AnyAction>} & GetServerSidePropsContext & any