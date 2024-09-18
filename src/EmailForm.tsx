import React, { useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Grid,
    Paper,
    MenuItem,
    Alert,
    AlertTitle
} from '@mui/material';

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

    const handleSuggestEmail = () => {
        if (!emailData.emailTo || !emailData.subject || !emailData.emailBody) {
            setMissingDataError({
                name: 'EmailGenerationError',
                message: 'Email data is missing!'
            });
        } else {
            setMissingDataError(null);
        }
    };

    const handleTestConnection = async () => {
        const organisation = 'me';
        const serviceType = emailData.serviceType; // Using the serviceType instead of connectionId
        const url = `http://localhost:1235/url/itsm/${organisation}/emailConnection/${serviceType}`;

        try {
            const response = await fetch(url, {
                method: 'PUT', // Using PUT instead of POST
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
        <Grid container spacing={2} sx={{ maxWidth: '1000px', margin: 'auto', padding: 2 }}>
            {/* Email Details Section */}
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'left' }}>
                        Email Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Send Email To"
                                name="emailTo"
                                value={emailData.emailTo}
                                onChange={handleInputChange}
                                sx={{ borderRadius: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Subject"
                                name="subject"
                                value={emailData.subject}
                                onChange={handleInputChange}
                                sx={{ borderRadius: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="emailBody"
                                multiline
                                rows={4}
                                value={emailData.emailBody}
                                onChange={handleInputChange}
                                sx={{ borderRadius: 2 }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                sx={{ borderRadius: 2, backgroundColor: '#85D7FF', color: '#fff' }}
                                fullWidth
                                onClick={handleSuggestEmail}
                            >
                                SUGGEST EMAIL
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                sx={{ borderRadius: 2, backgroundColor: '#E0E0E0', color: '#000' }}
                                fullWidth
                                onClick={handleResetEmailData}
                            >
                                RESET EMAIL DATA
                            </Button>
                        </Grid>

                        {missingDataError && (
                            <Grid item xs={12}>
                                <Alert severity="error" sx={{ borderRadius: 2 }}>
                                    <AlertTitle>{missingDataError.name}</AlertTitle>
                                    {missingDataError.message}
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                </Paper>
            </Grid>

            {/* Service & Authentication Section */}
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'left' }}>
                        Service & Authentication
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Choose the service"
                                select
                                value={emailData.serviceType}
                                onChange={handleServiceChange}
                                sx={{ borderRadius: 2 }}
                            >
                                <MenuItem value="">Choose the service</MenuItem>
                                <MenuItem value="SMTP">SMTP</MenuItem>
                                <MenuItem value="SendGrid">SendGrid</MenuItem>
                            </TextField>
                        </Grid>

                        {emailData.serviceType === 'SMTP' && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="SMTP Server"
                                        name="smtpServer"
                                        value={emailData.smtpServer}
                                        onChange={handleInputChange}
                                        sx={{ borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="SMTP Port"
                                        name="smtpPort"
                                        value={emailData.smtpPort}
                                        onChange={handleInputChange}
                                        sx={{ borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        name="username"
                                        value={emailData.username}
                                        onChange={handleInputChange}
                                        sx={{ borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={emailData.password}
                                        onChange={handleInputChange}
                                        sx={{ borderRadius: 2 }}
                                    />
                                </Grid>
                            </>
                        )}

                        {emailData.serviceType === 'SendGrid' && (
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="API Key"
                                    name="apiKey"
                                    value={emailData.apiKey}
                                    onChange={handleInputChange}
                                    sx={{ borderRadius: 2 }}
                                />
                            </Grid>
                        )}

                        {emailData.serviceType && (
                            <>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        sx={{ borderRadius: 2, backgroundColor: '#85D7FF', color: '#fff' }}
                                        fullWidth
                                        onClick={handleTestConnection}
                                    >
                                        TEST CONNECTION
                                    </Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        sx={{ borderRadius: 2, backgroundColor: '#28a745', color: '#fff' }}
                                        fullWidth
                                    >
                                        SEND EMAIL
                                    </Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        sx={{ borderRadius: 2, backgroundColor: '#E0E0E0', color: '#000' }}
                                        fullWidth
                                        onClick={handleResetServiceData}
                                    >
                                        RESET
                                    </Button>
                                </Grid>

                                {connectionError && (
                                    <Grid item xs={12}>
                                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                                            <AlertTitle>{connectionError.name}</AlertTitle>
                                            {connectionError.message}
                                        </Alert>
                                    </Grid>
                                )}
                            </>
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default EmailForm;
