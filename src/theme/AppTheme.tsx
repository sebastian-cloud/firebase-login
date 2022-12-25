import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import customTheme from './customTheme'

export const AppTheme = ({ children }: { children: JSX.Element }) => {
    return (
        <ThemeProvider theme={ customTheme }>
            <CssBaseline />

            { children }
        </ThemeProvider>
    )
}
