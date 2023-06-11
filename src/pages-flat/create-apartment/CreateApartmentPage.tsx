import React from 'react';
import s from './style.module.scss';
import {useTranslation} from "next-i18next";
import {FormProvider, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "@/app/store/store";
import Dropdown from "@/shared/ui/Dropdown";
import {Button} from "@mui/material";
import Input from "@/shared/ui/Input";
import {useRouter} from "next/router";
import {EditApartmentProps} from "../../../pages/apartments/edit/[id]";
import {createApartment} from "@/entities/apartment/model";
import Gallery from "@/entities/gallery/Gallery";

const listCurrency = ['USD', 'EUR', 'RUB', 'TRY'].map(currency => ({value: currency, name: currency}))

export type CreateEditApartmentFormType = {
    title: string
    currency: string
    price: number
    category: string
    employee: string
    address: string
    fileNames: Array<string>
}

const getInitialValues = (list: Array<{ value: string, name: string }>, itemValue: number) => {
    const findItem = list.find(i => i.value === String(itemValue))
    if (findItem) {
        return findItem.value
    }
    return 'NOT_SELECTED'
}

const CreateApartmentPage = ({editApartment}: EditApartmentProps) => {
    const {t, i18n} = useTranslation()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const employees = useAppSelector(state => state.apartment.employees)
        .map((employee) => ({value: String(employee.id), name: employee.name}))
    const categories = useAppSelector(state => state.apartment.categories)
        .map(category => ({value: String(category.id), name: category.name}))

    const initialValueCategory = editApartment?.categoryId
        ? getInitialValues(categories, editApartment.categoryId)
        : 'NOT_SELECTED'
    const initialValueEmployee = editApartment?.employeeId
        ? getInitialValues(employees, editApartment.employeeId)
        : 'NOT_SELECTED'

    const defaultValues: CreateEditApartmentFormType = {
        title: editApartment ? editApartment.title : '',
        currency: editApartment?.currency ?? 'TRY',
        price: editApartment ? editApartment.price : 0,
        address: editApartment?.address ?? '',
        category: initialValueCategory,
        employee: initialValueEmployee,
        fileNames: editApartment?.fileNames ?? []
    }
    const methods = useForm<CreateEditApartmentFormType>({
        mode: 'onSubmit',
        defaultValues
    })


    const onHandlerReset = async () => {
        methods.reset(defaultValues)
        await router.push('/apartments')
    }
    const onHandlerSave = async (data: CreateEditApartmentFormType) => {
        console.log('data',data)
        const res = await dispatch(createApartment(data))
        console.log('CREATE APARTMENT',res)
        if (res.meta.requestStatus === 'fulfilled') {
            await router.push('/apartments')
        }
    }

    const onHandlerCreateField = () => {

    }

    return (
        <div className={s.wrapper}>
            <div className={s.createApartment}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onHandlerSave)}>
                        <div>
                            <div className={s.header}>
                                <h1> {editApartment ? editApartment.title : 'Добавить недвижимость'}</h1>
                                <div className={s.headerButtons}>
                                    <Button variant="outlined" type='reset' onClick={onHandlerReset}>Отменить</Button>
                                    <Button type='submit' variant="contained">Сохранить</Button>
                                </div>
                            </div>
                            <div className={s.list}>
                                <Dropdown className={s.widthInput} name='employee' list={employees} label='Сотрудники'/>
                                <Dropdown className={s.widthInput} name='category' list={categories} label='Категории'/>
                                <Input className={s.widthInput} name="title" label="title"/>
                                <Dropdown className={s.widthInput} name="currency" list={listCurrency} label='Валюта'/>
                                <Input className={s.widthInput} name="price" label="price" type='number'/>
                                <Input className={s.widthInput} name="address" label="address"/>
                                <div>
                                    <h3>Gallery</h3>
                                </div>
                                <Gallery />
                            </div>
                            <Button onClick={onHandlerCreateField} type='button' variant='outlined'>Добавить
                                поле</Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
};

export default CreateApartmentPage;