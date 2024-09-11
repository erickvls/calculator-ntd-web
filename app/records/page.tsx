'use client';

import AuthenticatedLayout from "@/src/components/AuthenticatedLayout";

import DataTable from "@/src/components/DataTable";
import { Box, Container } from "@mui/material";

export default function Records() {
  return (
    <AuthenticatedLayout>
      <Container style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      }}>
        <Box sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',

        }}>
          <DataTable />
        </Box>
      </Container>
    </AuthenticatedLayout>
  )
}