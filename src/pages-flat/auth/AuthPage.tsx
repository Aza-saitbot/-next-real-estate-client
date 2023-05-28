import React, {useState} from 'react';
import {FormProvider, useForm} from "react-hook-form";
import s from "./style.module.scss";
import InputStyled from "@/shared/ui/InputStyled";
import {Button} from "@mui/material";
import * as api from "@/shared/api";
import {setCookie} from "nookies";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {AuthUserDTO} from "@/shared/api/auth/dto/auth-dto";


type SchemaLogin = {
    email: string;
    password: string;
    fullName?: string;
}

const LoginPage = () => {
    const router = useRouter()
    const {locale} = router
    const {t, i18n} = useTranslation()
    const [modeAuth, setModeAuth] = useState<'login' | 'registration'>('login')
    const isModeLogin = modeAuth === 'login'

    const methods = useForm<SchemaLogin>({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: '',
            fullName: ''
        }
    });

    const onSubmit = async (data: SchemaLogin) => {
        let payload: AuthUserDTO = {
            email: data.email,
            password: data.password,
            url: modeAuth,
        }
        if (data.fullName) payload.fullName = data.fullName

        try {
            const {token} = await api.auth.toggle(payload)
            setCookie(null, "_token", token, {path: '/'})
            await router.push('/admin', '/admin', {locale})
        } catch (e: any) {}
    }

    const optionsFillName = isModeLogin ? {} : {
        required: {
            value: true,
            message: 'Обязательное поле'
        }
    }

    const onToggle = () => {
        isModeLogin ? setModeAuth('registration') : setModeAuth('login')
    }

    return (
        <div className={s.login}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={s.form}>
                        <InputStyled name='email' options={{required: {value: true, message: 'Обязательное поле'}}}
                                     label="Email"/>
                        <InputStyled name='password' options={{required: {value: true, message: 'Обязательное поле'}}}
                                     label="Password" type='password'/>
                        {!isModeLogin && <InputStyled name='fullName' options={optionsFillName} label="Полное имя"/>}
                        <Button type='submit'
                                variant='outlined'>{isModeLogin ? 'Авторизоваться' : 'Зарегистрироваться'}</Button>
                        <div>
                            <div>
                                {isModeLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                            </div>
                            <Button onClick={onToggle} type='button'
                                    variant='outlined'> {isModeLogin ? 'Зарегистрироваться' : 'Авторизоваться'}</Button>
                        </div>

                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default LoginPage;