import React from 'react';
import style from './header.module.scss';
import Link from "next/link";
import {useRouter} from "next/router";

const Header = () => {
    const router = useRouter()
    const onLogin = () => {
        router.push('/login')
    }
    return (
        <div className={style.header}>
            <div>Home</div>
            <div className={style.login}>
                <button onClick={onLogin}>Login</button>
            </div>
        </div>
    );
};

export default Header;