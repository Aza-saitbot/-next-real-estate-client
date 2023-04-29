import React from 'react';
import {FormProvider, useForm} from "react-hook-form";
import s from "./style.module.scss";
import InputStyled from "@/shared/ui/InputStyled";
import {Button} from "@mui/material";
import * as api from "@/shared/api";
import {setCookie} from "nookies";
import {useRouter} from "next/router";


type SchemaRegister = {
    email: string;
    password: string;
    fullName: string;
}

const RegisterPage = () => {

    const router = useRouter()

    const methods = useForm<SchemaRegister>({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: '',
            fullName:''
        }
    });

    const onSubmit = async (data: SchemaRegister) => {
        try {
            const {token} = await api.auth.registration(data)
            router.push('/admin')
            setCookie(null,"_token",token,{
                path:'/'
            })
        } catch (e:any) {

            router.push('/register')
        }
    }

    return (
        <div className={s.login}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={s.form}>
                        <InputStyled name='email' options={{required: {value:true,message:'Обязательное поле'}}} label="Email"/>
                        <InputStyled name='password' options={{required: {value:true,message:'Обязательное поле'}}} label="Password" type='password'/>
                        <InputStyled name='fullName' options={{required: {value:true,message:'Обязательное поле'}}} label="Полное имя" />
                        <Button variant='outlined' type='submit'>Зарегистрироваться</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default RegisterPage;