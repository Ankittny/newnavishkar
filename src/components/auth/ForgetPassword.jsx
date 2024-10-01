"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      setMessage('Password reset link has been sent to your email.');
    } catch (error) {
      setMessage('Error sending reset link, please try again.');
    }
  };

  return (
    <div className='container mt-4'>
      <Typography variant="h5">Forgot Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter your email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" style={{backgroundColor:'#175A95'}}>
          Send Reset Link
        </Button>
      </form>
      {message && <Typography variant="body1">{message}</Typography>}
    </div>
  );
};

export default ForgotPassword;