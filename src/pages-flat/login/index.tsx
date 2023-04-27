import React from 'react';
import {useDispatch} from "react-redux";
import {FormProvider, useForm} from "react-hook-form";
import s from "./style.module.scss";
import InputStyled from "@/shared/ui/InputStyled";
import {Button} from "@mui/material";
import {createUser} from "@/entities/user/model/userReducer";


type SchemaLogin = {
    email: string;
    password: string;
}

const LoginPage = () => {
    const dispatch = useDispatch();

    const methods = useForm<SchemaLogin>({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: SchemaLogin) => {
        dispatch(createUser(data));
    }

    return (
        <div className={s.login}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={s.form}>
                        <InputStyled name='email' options={{required: {value:true,message:'Обязательное поле'}}} label="Email"/>
                        <InputStyled name='password' options={{required: {value:true,message:'Обязательное поле'}}} label="Password" type='password'/>
                        <Button variant='outlined' type='submit'>Войти</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default LoginPage;