import React from 'react';
import EmailForm from './EmailForm';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: `'Poppins', 'Helvetica Neue', Arial, sans-serif`,
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <EmailForm />
            </div>
        </ThemeProvider>
    );
}

export default App;
