"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
 

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('/api/auth/reset-password', {
        token,
        newPassword,
      });
      setMessage('Password successfully reset.');
    } catch (error) {
      setMessage('Error resetting password, please try again.');
    }
  };

  return (
    <div className='container mt-4'>
      <Typography variant="h5">Reset Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          value={newPassword}
          onChange={handlePasswordChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm New Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Reset Password
        </Button>
      </form>
      {message && <Typography variant="body1">{message}</Typography>}
    </div>
  );
};

export default ResetPassword;
