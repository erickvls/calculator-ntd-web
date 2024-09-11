import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRecords } from '../hooks/useRecords';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Importe o ícone de lixeira

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
    const [page, setPage] = useState(0);  // Página atual
    const [sort, setSort] = useState('date,desc');  // Critério de ordenação
    const [totalElements, setTotalElements] = useState(0);  // Total de registros
    const [pageSize, setPageSize] = useState(10);  // Itens por página

    const [confirmDelete, setConfirmDelete] = useState<string | null>(null); // ID do registro para deletar
    const [openDialog, setOpenDialog] = useState(false); // Controla a abertura do diálogo

    const fetchRecords = async (page: number, sort: string, size: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getRecords(page, size, sort);  // Página e tamanho dinâmicos
            const records = response.content.map((record: Record) => ({
                id: record.id,
                userBalance: record.userBalance,
                operationResponse: record.operationResponse,
                date: new Date(record.date).toLocaleDateString('en-US'),
                operationType: record.operationType,
            }));
            setRows(records);
            setTotalElements(response.totalElements);  // Atualiza o total de registros
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
                fetchRecords(page, sort, pageSize); // Atualiza a lista após a exclusão
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

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'userBalance', headerName: 'User Balance', flex: 1 },
        { field: 'operationResponse', headerName: 'Operation Response', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'operationType', headerName: 'Operation Type', flex: 1 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <IconButton
                    color="error"
                    onClick={() => handleOpenDialog(params.row.id)}
                >
                    <DeleteIcon /> {/* Ícone de lixeira */}
                </IconButton>
            ),
        },
    ];

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

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this record?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
