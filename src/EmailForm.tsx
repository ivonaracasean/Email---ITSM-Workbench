import React, { useState } from 'react';
import { Grid, Typography, Paper, MenuItem, TextField } from '@mui/material';
import InputField from './components/InputField';
import FormButton from './components/FormButton';
import ErrorAlert from './components/ErrorAlert';

const EmailForm = () => {
    const [emailData, setEmailData] = useState({
        emailTo: '',
        subject: '',
        emailBody: '',
        serviceType: '',
        smtpServer: '',
        smtpPort: '',
        username: '',
        password: '',
        apiKey: ''
    });

    const [missingDataError, setMissingDataError] = useState<{ name: string; message: string } | null>(null);
    const [connectionError, setConnectionError] = useState<{ name: string; message: string } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmailData({
            ...emailData,
            [name]: value
        });
    };

    const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailData({
            ...emailData,
            serviceType: e.target.value
        });
    };

    // Validation function for Email section
    const validateEmailData = () => {
        return emailData.emailTo && emailData.subject && emailData.emailBody;
    };

    const handleSuggestEmail = () => {
        if (!validateEmailData()) {
            setMissingDataError({
                name: 'EmailGenerationError',
                message: 'Email data is missing!'
            });
        } else {
            setMissingDataError(null);
        }
    };

    // Validation function for Service section
    const validateServiceData = () => {
        if (emailData.serviceType === 'SMTP') {
            return emailData.smtpServer && emailData.smtpPort && emailData.username && emailData.password;
        } else if (emailData.serviceType === 'SendGrid') {
            return emailData.apiKey;
        }
        return false;
    };

    const handleTestConnection = async () => {
        if (!validateServiceData()) {
            setConnectionError({
                name: 'ConnectionError',
                message: 'Service data is missing or incomplete!'
            });
            return;
        }

        const organisation = 'me';
        const serviceType = emailData.serviceType;
        const url = `http://localhost:1235/url/itsm/${organisation}/emailConnection/${serviceType}`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    smtpServer: emailData.smtpServer,
                    smtpPort: emailData.smtpPort,
                    username: emailData.username,
                    password: emailData.password,
                    apiKey: emailData.apiKey
                }),
            });

            if (response.ok) {
                alert('Connection successful!');
                setConnectionError(null);
            } else {
                const errorData = await response.text();
                setConnectionError({
                    name: 'ConnectionError',
                    message: `Failed to connect: ${errorData}`
                });
            }
        } catch (error) {
            setConnectionError({
                name: 'ConnectionError',
                message: `Error connecting: ${error}`
            });
        }
    };

    const handleResetEmailData = () => {
        setEmailData({
            ...emailData,
            emailTo: '',
            subject: '',
            emailBody: ''
        });
        setMissingDataError(null);
    };

    const handleResetServiceData = () => {
        setEmailData({
            ...emailData,
            serviceType: '',
            smtpServer: '',
            smtpPort: '',
            username: '',
            password: '',
            apiKey: ''
        });
        setConnectionError(null);
    };

    return (
        <Grid container spacing={4} sx={{ maxWidth: '1000px', margin: 'auto', padding: 2 }}>
            {/* Email Details Section */}
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'left' }}>
                        Email Details
                    </Typography>
                    <Grid container spacing={2}>
                        <InputField label="Send Email To" name="emailTo" value={emailData.emailTo} onChange={handleInputChange} />
                        <InputField label="Subject" name="subject" value={emailData.subject} onChange={handleInputChange} />
                        <InputField label="Email Body" name="emailBody" value={emailData.emailBody} onChange={handleInputChange} multiline rows={4} />

                        <FormButton label="SUGGEST EMAIL" onClick={handleSuggestEmail} backgroundColor="#85D7FF" />
                        <FormButton label="RESET EMAIL DATA" onClick={handleResetEmailData} backgroundColor="#E0E0E0" />

                        {/* Full-width Alert */}
                        <Grid item xs={12}>
                            <ErrorAlert error={missingDataError} />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            {/* Service & Authentication Section */}
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'left' }}>
                        Service & Authentication
                    </Typography>
                    <Grid container spacing={2}>
                        <TextField
                            fullWidth
                            label="Choose the service"
                            select
                            value={emailData.serviceType}
                            onChange={handleServiceChange}
                            sx={{ borderRadius: 2, mb: 2 }}
                        >
                            <MenuItem value="">Choose the service</MenuItem>
                            <MenuItem value="SMTP">SMTP</MenuItem>
                            <MenuItem value="SendGrid">SendGrid</MenuItem>
                        </TextField>

                        {emailData.serviceType === 'SMTP' && (
                            <>
                                <InputField label="SMTP Server" name="smtpServer" value={emailData.smtpServer} onChange={handleInputChange} />
                                <InputField label="SMTP Port" name="smtpPort" value={emailData.smtpPort} onChange={handleInputChange} />
                                <InputField label="Username" name="username" value={emailData.username} onChange={handleInputChange} />
                                <InputField label="Password" name="password" value={emailData.password} onChange={handleInputChange} type="password" />
                            </>
                        )}

                        {emailData.serviceType === 'SendGrid' && (
                            <InputField label="API Key" name="apiKey" value={emailData.apiKey} onChange={handleInputChange} />
                        )}

                        {emailData.serviceType && (
                            <>
                                <FormButton label="TEST CONNECTION" onClick={handleTestConnection} backgroundColor="#85D7FF" />
                                <FormButton label="SEND EMAIL" backgroundColor="#28a745" />
                                <FormButton label="RESET" onClick={handleResetServiceData} backgroundColor="#E0E0E0" />

                                {/* Full-width Alert */}
                                <Grid item xs={12}>
                                    <ErrorAlert error={connectionError} />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default EmailForm;
