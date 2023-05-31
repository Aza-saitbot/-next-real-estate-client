import React, {useState} from 'react';
import {DataGrid, GridCellParams, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {EditableCell} from "@/entities/admin/ui/EditableCell/EditableCell";
import {useRouter} from "next/router";

const rows = [
    { id: 117, lastName: 'Нажми сюда', title: '117 Пользователь', age: 35 },
    { id: 2, lastName: 'Lannister', title: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', title: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', title: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', title: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', title: null, age: 150 },
    { id: 7, lastName: 'Clifford', title: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', title: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', title: 'Harvey', age: 65 },
];


const TableApartments = () => {
    const router = useRouter()

     const handleSave = async (id: number) => {
        await router.push(`/admin/${id}`)
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Заголовок', width: 200,
            renderCell: (params: GridCellParams) => (
                <EditableCell value={params.value as string} id={params.id as number} onSave={handleSave} />
            ),
        },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
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