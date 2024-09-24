"use client"
import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation'


const NotFoundPage = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Container style={styles.container}>
      <Typography variant="h1" style={styles.heading}>
        404
      </Typography>
      <Typography variant="h5" style={styles.subHeading}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        style={styles.button}
      >
        Go to Home
      </Button>
    </Container>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f7f9fc',
  },
  heading: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  subHeading: {
    marginBottom: '2rem',
    color: '#6c757d',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.2rem',
  },
};

export default NotFoundPage;