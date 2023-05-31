import React from 'react';
import s from './styles.module.scss';
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import TableApartments from "@/entities/admin/ui/TableApartments/table-apartments";


const AdminPage = () => {
    const router = useRouter()

    const onRedirectCreateApartment = async () => {
        await router.push('/admin/create-apartment', '/admin/create-apartment', { locale:router.locale })
    }
    return (
        <div className={s.admin}>
            <div className={s.header}>
                <h3>Список недвижимостей</h3>
                <Button onClick={onRedirectCreateApartment} variant='outlined' style={{backgroundColor:'white'}} >Добавить</Button>
            </div>
            <TableApartments/>
        </div>
    );
};

export default AdminPage;