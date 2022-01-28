import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../components/Link';

const Index = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          WELCOME TO SAGE
        </Typography>
        <Link href="/login" color="secondary">
          GET STARTED
        </Link>
      </Box>
    </Container>
  );
}

export default Index;
