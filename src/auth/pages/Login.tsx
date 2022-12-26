import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../layouts'
import GoogleIcon from '@mui/icons-material/Google'
import { Formik, FormikHelpers } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'
import { LoginBody } from '../../firebase/firebase.interface'
import { useEffect, useState } from 'react'
import { RootState } from '../../store'

const initialData: LoginBody = {
    email: '',
    password: '',
}

export const Login = () => {
    
    const [googleSubmitting, setGoogleSubmitting] = useState(false)
    const dispatch = useDispatch<any>()
    const errorMessage = useSelector(( state: RootState ) => state.auth.errorMessage)
    const navigate = useNavigate()

    const signIn = ( values: LoginBody, { setSubmitting }: FormikHelpers<LoginBody> ) => {
        
        dispatch( startLoginWithEmailPassword( { ...values, email: values.email.trim() } ) )
        setSubmitting( false )
    }

    const validateData = ( values: LoginBody ) => {
        let errors: any = {}
        // Email validations
        if( !values.email )
          errors.email = 'This field is required.';
        // Password validations
        if (!values.password)
          errors.password = 'This field is required.';
        // Return posible errors
        return errors;
    }

    const GoogleSignIn = () => {
        setGoogleSubmitting( true )
        dispatch( startGoogleSignIn( setGoogleSubmitting ) )
    }

    return (
        <AuthLayout title='Login'>
            <Formik
                initialValues={ initialData }
                validate={ validateData }
                onSubmit={ signIn }
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form onSubmit={ handleSubmit }>
                        <Grid sx={{ mb: 1 }}>
                            <TextField 
                                variant='outlined'
                                placeholder='Email'
                                type="text"
                                fullWidth
                                name='email'
                                autoComplete='off'
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                value={ values.email }
                            />
                            { errors.email && touched.email && <Typography variant='caption' color="error">{ errors.email }</Typography> }
                        </Grid>
                        <Grid>
                            <TextField 
                                variant='outlined'
                                placeholder='Password'
                                type="password"
                                fullWidth
                                name='password'
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                value={ values.password }
                            />
                            { errors.password && touched.password && <Typography variant='caption' color="error">{ errors.password }</Typography> }
                        </Grid>
                        {
                            ( errorMessage )
                            && (
                                <Grid sx={{ mt: 4}}>
                                    <Alert severity="error">{ errorMessage }</Alert>
                                </Grid>
                            )
                        }
                        <Grid 
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            textAlign="center"
                            sx={{ mb: 4, mt: 4 }}
                        >
                            <Button 
                                variant='contained'
                                // onClick={ signIn }
                                type='submit'
                                disabled={ isSubmitting || googleSubmitting }
                            >
                                Sign In
                            </Button>
                            <Typography 
                                color="secondary.main"
                                sx={{ mb: 1, mt: 1 }}
                            >
                                - o -
                            </Typography>
                            <Button 
                                variant='contained'
                                color='secondary'
                                onClick={ GoogleSignIn }
                                startIcon={ <GoogleIcon /> }
                                disabled={ isSubmitting || googleSubmitting }
                            >
                                Sign In
                            </Button>
                        </Grid>
                        <Grid 
                            display="flex"
                            justifyContent="center"
                        >
                            <Link 
                                sx={{ cursor: 'pointer' }}
                                color="secondary"
                                onClick={ () => navigate('/auth/register') }
                            >
                                I don't have an account
                            </Link>
                        </Grid>
                    </form>
                )}
            </Formik>
        </AuthLayout>
    )
}
