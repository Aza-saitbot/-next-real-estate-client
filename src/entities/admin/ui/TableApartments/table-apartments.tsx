import React, {useState} from 'react';
import {DataGrid, GridCellParams, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {EditableCell} from "@/entities/admin/ui/EditableCell/EditableCell";
import {useRouter} from "next/router";
import {useAppSelector} from "@/app/store/store";

const TableApartments = () => {
    const router = useRouter()
    const listApartments = useAppSelector(state => state.apartment.apartments)
    // const employees = useAppSelector(state => state.apartment.employees)
    // const categories = useAppSelector(state => state.apartment.categories)


     const handlerEditApartment = async (id: number) => {
        await router.push(`/apartments/edit/${id}`)
    };
    // categoryId: number
    // employeeId: number

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Заголовок', width: 200,
            renderCell: (params: GridCellParams) => (
                <EditableCell value={params.value as string} id={params.id as number} handlerEditApartment={handlerEditApartment} />
            ),
        },
        { field: 'price', headerName: 'Цена', type:'number', width: 100 },
        { field: 'currency', headerName: 'Валюта', width: 70 },
        { field: 'address', headerName: 'Адрес', width: 130 },
        // { field: 'name', headerName: 'Название сотрудника', width: 130 },
        // { field: 'name', headerName: 'Статус', width: 130 },
    ];

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={listApartments}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[8, 15]}
                checkboxSelection
            />
        </div>
    );
};

export default TableApartments;

// {
//     field: 'fullName',
//         headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
// },