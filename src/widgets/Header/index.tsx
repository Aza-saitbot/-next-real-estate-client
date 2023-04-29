import React from 'react';
import style from './header.module.scss';
import * as api from '@/shared/api';
import {useRouter} from "next/router";
import {useAppSelector} from "@/app/store/store";

const Header = () => {
    const router = useRouter()
    const user = useAppSelector(state => state.user.user)
    const onHandlerExit = async () => {
        await router.push('/admin')
    }

    const onLogin = async () => {
        api.auth.logout()
        await router.push('/login')
    }
    const onHome = async () => {
        await router.push('/')
    }
    return (
        <div className={style.header}>
            <div>
                <button onClick={onHome}>Home</button>
            </div>
            <div className={style.login}>
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