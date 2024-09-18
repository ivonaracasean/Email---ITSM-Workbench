import React from 'react';
import { Button } from '@mui/material';

interface FormButtonProps {
    label: string;
    onClick?: () => void;
    backgroundColor: string;
    fullWidth?: boolean;
    disabled?: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({ label, onClick, backgroundColor, fullWidth = true, disabled = false }) => (
    <Button
        variant="contained"
        sx={{ borderRadius: 2, backgroundColor: backgroundColor, color: '#fff', mb: 2 }}
        fullWidth={fullWidth}
        onClick={onClick}
        disabled={disabled}
    >
        {label}
    </Button>
);

export default FormButton;
