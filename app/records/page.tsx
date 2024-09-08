'use client';

import Box from "@/src/components/Box";
import DataTable from "@/src/components/DataTable";
import { Container } from "@mui/material";

export default function Page() {
  return (
    <Container style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    }}>
      <Box size="lg">
        <DataTable />
      </Box>
    </Container>
  )
}