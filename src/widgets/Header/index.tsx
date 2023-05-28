import React from 'react';
import style from './header.module.scss';
import * as api from '@/shared/api';
import {useRouter} from "next/router";
import {useAppSelector} from "@/app/store/store";
import {useTranslation} from "next-i18next";

const Header = () => {
    const router = useRouter()
    const {asPath,locale} = router
    const { t,i18n } = useTranslation()
    const user = useAppSelector(state => state.user.user)
    const onHandlerExit = async () => {
        await router.push('/admin','/admin',{locale})
    }

    const onLogin = async () => {
        await router.push('/auth','/auth',{locale})
        api.auth.logout()
    }
    const onHome = async () => {
        await router.push('/','/',{locale})
    }
    return (
        <div className={style.header}>
            <div>
                <button onClick={onHome}>Home</button>
            </div>
            <div className={style.login}>
                {t('yes')}
                <div>
                    {user?.fullName}
                </div>
                {user && <button onClick={onLogin}>Выйти</button>}
                {!user && <button onClick={onHandlerExit}>Войти</button>}
            </div>
        </div>
    );
};

export default Header;