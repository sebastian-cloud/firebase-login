import React from 'react'
import { Divider, Grid, Paper, Typography } from '@mui/material'

interface Props {
    children: JSX.Element,
    title: string
}

export const AuthLayout = ({ children, title }: Props) => {
    return (
        <Grid
            container
            spacing={ 0 }
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', padding: 4 }}
        >
            <Paper
                // item
                // xs={ 3 }
                sx={{ width: { xs: '100%', sm: 450 }, backgroundColor: 'white', padding: 3, borderRadius: 2 }}
                elevation={ 6 }
            >
                <Typography variant='h5' sx={{ mb: 2, textAlign: 'center' }}>{ title }</Typography>

                <Divider sx={{ mb: 2 }} />

                { children }
            </Paper>
        </Grid>
    )
}
