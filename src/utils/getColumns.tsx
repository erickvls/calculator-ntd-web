import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const getColumns = (handleOpenDialog: (id: string) => void): GridColDef[] => [
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
            <IconButton color="error" onClick={() => handleOpenDialog(params.row.id)}>
                <DeleteIcon />
            </IconButton>
        ),
    },
];
