import React from 'react';
import s from './style.module.scss';
import {useTranslation} from "next-i18next";
import {FormProvider, useForm} from "react-hook-form";
import {useAppSelector} from "@/app/store/store";
import Dropdown from "@/shared/ui/Dropdown";
import {Button, TextField} from "@mui/material";
import {SchemaApartmentFormType} from "@/shared/api/apartments/model";
import Input from "@/shared/ui/Input";
import DragBar from "@/shared/ui/DragBar/DragBar";
import {useRouter} from "next/router";

const listCurrency = [
    {id: 1, name: 'USD'},
    {id: 2, name: 'EUR'},
    {id: 3, name: 'RUB'},
    {id: 4, name: 'TRY'},
]

const defaultValues: SchemaApartmentFormType = {
    title: '',
    currency: '4',
    price: 0,
    provinces: '',
    county: '',
    district: '',
    lat: '',
    lng: '',
    description: '',
    totalRooms: '',
    totalAre: 0,
    totalFloors: 0,
    locationFloor: 0,
    heatingType: '',
    categoryId: 0,
    employeeId: 0,
    images: []
}

const CreateApartmentPage = () => {
    const {t, i18n} = useTranslation()
    const router = useRouter()
    const methods = useForm<SchemaApartmentFormType>({
        mode: 'onSubmit',
        defaultValues,
    })
    const employees = useAppSelector(state => state.apartment.employees).map(({id, name}) => ({id, name}))
    const categories = useAppSelector(state => state.apartment.categories)


    const onHandlerReset = async () => {
        methods.reset(defaultValues)
        await router.push('/admin')
    }
    const onHandlerSave = (data:SchemaApartmentFormType) => {
        console.log('Submit data', data)
    }

    const onHandlerCreateField = () => {

    }

    return (
        <div className={s.createApartment}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onHandlerSave)}>
                    <div>
                        <div className={s.header}>

                                <h1>Добавить недвижимость</h1>
                                <div className={s.headerButtons}>
                                    <Button variant="outlined" type='reset' onClick={onHandlerReset} >Отменить</Button>
                                    <Button type='submit' variant="contained" >Сохранить</Button>
                                </div>

                        </div>
                        <div className={s.listDropdowns}>
                            <Dropdown className={s.widthInput} name='employeeId' list={employees} label='Сотрудники'/>
                            <Dropdown className={s.widthInput} name='categoryId' list={categories} label='Категории'/>
                        </div>
                        <div className={s.list}>
                            <Input className={s.widthInput} name="title" label="title"/>
                            <Dropdown className={s.widthInput} name="currency" list={listCurrency} label='Валюта'/>
                            <Input className={s.widthInput} name="price" label="price" type='number'/>
                            <Input className={s.widthInput} name="provinces" label="provinces"/>
                            <Input className={s.widthInput} name="county" label="county"/>
                            <Input className={s.widthInput} name="district" label="district"/>
                            <Input className={s.widthInput} name="description" label="description"/>
                            <Input className={s.widthInput} name="heatingType" label="heatingType"/>
                            <Input className={s.widthInput} name="totalAre" label="totalAre" type="number"/>
                            <Input className={s.widthInput} name="totalFloors" label="totalAre" type="number"/>
                            <Input className={s.widthInput} name="locationFloor" label="totalAre" type="number"/>
                            <DragBar/>
                        </div>
                        <Button onClick={onHandlerCreateField} type='button' variant='outlined' >Добавить поле</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
};

export default CreateApartmentPage;