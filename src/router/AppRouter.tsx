
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes'
import { useCheckAuth } from '../hooks'
import { ProtectedRoutes } from '../protected/router'
import { CheckingAuth } from '../ui'

export const AppRouter = () => {

    const status = useCheckAuth()
    
    if ( status === 'checking' ) {
        return <CheckingAuth />
    }

    return (
        <Routes>
            {
                ( status === 'authenticated' )
                ? <Route path='/*' element={ <ProtectedRoutes /> } />
                : <Route path='/auth/*' element={ <AuthRoutes /> } />
            }

            <Route path='/*' element={ <Navigate to="/auth/login" /> } />
        </Routes>
    )
}
