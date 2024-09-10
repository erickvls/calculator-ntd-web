import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { useRecords } from '../hooks/useRecords';

interface Record {
    id: string;
    userBalance: string;
    operationResponse: string;
    date: string;
    operationType: string;
}

export default function BasicTable() {
    const { getRecords } = useRecords();
    const [rows, setRows] = useState<Record[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await getRecords();
                const records = response.content.map(record => ({
                    id: record.id,
                    userBalance: record.userBalance,
                    operationResponse: record.operationResponse,
                    date: new Date(record.date).toLocaleDateString("en-US"),
                    operationType: record.operationType
                }));
                setRows(records);
            } catch (err) {
                console.error('Failed to fetch records:', err);
                setError('Failed to load records');
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, [getRecords]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">User Balance</TableCell>
                        <TableCell align="right">Operation Response</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Operation Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.userBalance}</TableCell>
                            <TableCell align="right">{row.operationResponse}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            <TableCell align="right">{row.operationType}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
