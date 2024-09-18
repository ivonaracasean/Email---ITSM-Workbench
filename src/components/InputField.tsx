import React from 'react';
import { TextField } from '@mui/material';

interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    multiline?: boolean;
    rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, type = 'text', multiline = false, rows = 1 }) => (
    <TextField
        fullWidth
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        multiline={multiline}
        rows={rows}
        sx={{ borderRadius: 2, mb: 2 }}
    />
);

export default InputField;
