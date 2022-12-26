import { Alert, Button, Divider, Grid, Link, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../layouts'
import GoogleIcon from '@mui/icons-material/Google'
import { Formik, FormikHelpers } from 'formik'
import { RegisterBody } from '../../firebase/firebase.interface'
import { useDispatch, useSelector } from 'react-redux'
import { startRegisterUserWithEmailPassword } from '../../store/auth/thunks'
import { RootState } from '../../store'

const initialData: RegisterBody = {
    email: '',
    password: '',
    displayName: '',
}

export const Register = () => {

    const navigate = useNavigate()
    const errorMessage = useSelector(( state: RootState ) => state.auth.errorMessage)
    const dispatch = useDispatch<any>()

    const signUp = ( values: RegisterBody, { setSubmitting }: FormikHelpers<RegisterBody> ) => {
        
        dispatch( startRegisterUserWithEmailPassword({ ...values, email: values.email }) )
        setSubmitting( false )
    }

    const validateData = ( values: RegisterBody ) => {
        let errors: any = {}
        // Email validations
        if( !values.email )
          errors.email = 'This field is required.';
        // Password validations
        if (!values.password)
          errors.password = 'This field is required.';
        // Display Name validations
        if (!values.displayName)
            errors.displayName = 'This field is required.';
        // Return posible errors
        return errors;
    }

    const GoogleSignUp = () => {
        console.log('google signup')
    }

    return (
        <AuthLayout title='Register'>
            <Formik
                initialValues={ initialData }
                validate={ validateData }
                onSubmit={ signUp }
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
                                placeholder='Full name'
                                type="text"
                                fullWidth
                                name='displayName'
                                autoComplete='off'
                                autoCapitalize='words'
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                value={ values.displayName }
                            />
                            { errors.displayName && touched.displayName && <Typography variant='caption' color="error">{ errors.displayName }</Typography> }
                        </Grid>
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
                                type='submit'
                                disabled={ isSubmitting }
                            >
                                Sign Up
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
                                onClick={ GoogleSignUp }
                                startIcon={ <GoogleIcon /> }
                                disabled={ isSubmitting }
                            >
                                Sign Up
                            </Button>
                        </Grid>
                        <Grid 
                            display="flex"
                            justifyContent="center"
                        >
                            <Link 
                                sx={{ cursor: 'pointer' }}
                                color="secondary"
                                onClick={ () => navigate('/auth') }
                            >
                                I have an account, go to login
                            </Link>
                        </Grid>
                    </form>
                )}
            </Formik>
        </AuthLayout>
    )
}
