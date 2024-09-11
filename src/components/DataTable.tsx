import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import { useRecords } from '../hooks/useRecords';

import { getColumns } from '../utils/getColumns';
import { DeleteDialog } from './DeleteDialog';

interface Record {
    id: string;
    userBalance: string;
    operationResponse: string;
    date: string;
    operationType: string;
}

export default function RecordsTable() {
    const { getRecords, deleteRecord } = useRecords();
    const [rows, setRows] = useState<Record[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [sort, setSort] = useState('date,desc');
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    const fetchRecords = async (page: number, sort: string, size: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getRecords(page, size, sort);
            const records = response.content.map((record: Record) => ({
                id: record.id,
                userBalance: record.userBalance,
                operationResponse: record.operationResponse,
                date: new Date(record.date).toLocaleDateString('en-US'),
                operationType: record.operationType,
            }));
            setRows(records);
            setTotalElements(response.totalElements);
        } catch (error) {
            console.error('Failed to fetch records:', error);
            setError('Failed to load records');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords(page, sort, pageSize);
    }, [page, sort, pageSize]);

    const handlePaginationChange = (newPaginationModel: { page: number; pageSize: number }) => {
        setPage(newPaginationModel.page);
        setPageSize(newPaginationModel.pageSize);
    };

    const handleDelete = async () => {
        if (confirmDelete) {
            try {
                await deleteRecord(confirmDelete);
                fetchRecords(page, sort, pageSize);
            } catch (error) {
                console.error('Failed to delete record:', error);
                setError('Failed to delete record');
            } finally {
                setOpenDialog(false);
                setConfirmDelete(null);
            }
        }
    };

    const handleOpenDialog = (id: string) => {
        setConfirmDelete(id);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setConfirmDelete(null);
    };

    const columns = getColumns(handleOpenDialog);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                paginationMode="server"
                rowCount={totalElements}
                sortingMode="server"
                onSortModelChange={(sortModel) => {
                    if (sortModel.length > 0) {
                        setSort(`${sortModel[0].field},${sortModel[0].sort}`);
                    }
                }}
                paginationModel={{ pageSize, page }}
                onPaginationModelChange={handlePaginationChange}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                autoHeight={true}
            />

            <DeleteDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onConfirm={handleDelete}
            />
        </>
    );
}
