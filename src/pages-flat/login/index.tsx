import React from 'react';
import {FormProvider, useForm} from "react-hook-form";
import s from "./style.module.scss";
import InputStyled from "@/shared/ui/InputStyled";
import {Button} from "@mui/material";


type SchemaLogin = {
    email: string;
    password: string;
}

const LoginPage = () => {
    const methods = useForm<SchemaLogin>({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (data: SchemaLogin) => {
        console.log('data', data)
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