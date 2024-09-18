import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface ErrorAlertProps {
    error: { name: string; message: string } | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
    return error ? (
        <Alert severity="error" sx={{ borderRadius: 2, mb: 2 }}>
            <AlertTitle>{error.name}</AlertTitle>
            {error.message}
        </Alert>
    ) : null;
};

export default ErrorAlert;
