import React from 'react'
import { Divider, Grid, Paper, Typography } from '@mui/material'
import CustomAppBar from '../components/CustomAppBar'

interface Props {
    children: JSX.Element
}

export const ProtectedLayout = ({ children }: Props) => {
    return (
        <>
            <CustomAppBar />
            <Grid
                container
                spacing={ 0 }
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ backgroundColor: 'forBackground.main', padding: 4 }}
            >
                { children }
            </Grid>
        </>
    )
}
