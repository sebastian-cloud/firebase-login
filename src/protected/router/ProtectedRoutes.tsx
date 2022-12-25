import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { EditProfile, Profile } from '../pages'

export const ProtectedRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={ <Profile /> } />
            <Route path='/edit' element={ <EditProfile /> } />
            <Route path='*' element={ <Navigate to="/" replace /> } />
        </Routes>
    )
}
