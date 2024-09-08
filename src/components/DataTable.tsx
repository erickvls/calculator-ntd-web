import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'cost', headerName: 'Cost', width: 70 },
    {
        field: 'result',
        headerName: 'Result',
        type: 'number',
        width: 90,
    },
    {
        field: 'createdAt',
        headerName: 'Date',
        width: 160,
        valueGetter: (value, row) => new Date(value).toLocaleDateString("en-US"),
    },
];

const rows = [
    {
        "id": 1,
        "cost": 427.81,
        "result": 43.4,
        "createdAt": 1705445541667
    },
    {
        "id": 2,
        "cost": 362.18,
        "result": 42.46,
        "createdAt": 1694386341667
    },
    {
        "id": 3,
        "cost": 404.75,
        "result": 64.03,
        "createdAt": 1725490341667
    },
    {
        "id": 4,
        "cost": 243.25,
        "result": 21.85,
        "createdAt": 1699915941667
    },
    {
        "id": 5,
        "cost": 190.47,
        "result": 17.44,
        "createdAt": 1712184741667
    },
    {
        "id": 6,
        "cost": 427.11,
        "result": 12.99,
        "createdAt": 1720824741667
    },
    {
        "id": 7,
        "cost": 69.94,
        "result": 15.5,
        "createdAt": 1717541541667
    },
    {
        "id": 8,
        "cost": 306.92,
        "result": 27.59,
        "createdAt": 1723157541667
    },
    {
        "id": 9,
        "cost": 400.04,
        "result": 52.34,
        "createdAt": 1695077541667
    },
    {
        "id": 10,
        "cost": 450.0,
        "result": 18.85,
        "createdAt": 1707432741667
    }
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {



    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                style={{ border: 0 }}
            />
        </Paper>
    );
}
