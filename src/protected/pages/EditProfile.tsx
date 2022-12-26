import { Grid, Typography, TextField, Button, Snackbar } from '@mui/material';
import { ProtectedLayout } from '../layouts'
import { FormikHelpers, useFormik } from 'formik';
import { EditProfileBody } from '../../firebase/firebase.interface';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import { startUpdateDisplayName } from '../../store/auth/thunks';


export const EditProfile = () => {

    const displayName = useSelector((state: RootState) => state.auth.displayName)
    const dispatch = useDispatch<any>();
    const [open, setOpen] = useState( false )
    const initialData: EditProfileBody = {
        displayName: displayName || ''
    }

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        resetForm
    } = useFormik({
        initialValues: initialData,
        validate: ( values ) => validateData( values ),
        onSubmit: ( values, Helpers ) => editProfileFromFB( values, Helpers )
    })

    const editProfileFromFB = ( values: EditProfileBody, { setSubmitting }: FormikHelpers<EditProfileBody> ) => {
        dispatch( startUpdateDisplayName( values.displayName ) )
        setOpen( true )
        setSubmitting( false )
    }

    const validateData = ( values: EditProfileBody ) => {
        let errors: any = {}
        // Email validations
        if( !values.displayName )
        errors.displayName = 'This field is required.';
        // Return posible errors
        return errors;
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    return (
        <ProtectedLayout>
            <>
                <form 
                    onSubmit={ handleSubmit }
                    style={{ 'width': '100%' }}
                >
                    <Grid
                        width="100%"
                    >
                        <Typography>
                            Nombre:
                        </Typography>
                        <TextField 
                            variant='outlined'
                            placeholder='Display Name'
                            type="text"
                            fullWidth
                            name='displayName'
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            value={ values.displayName }
                        />
                        { errors.displayName && touched.displayName && <Typography variant='caption' color="error">{ errors.displayName }</Typography> }
                    </Grid>
                    <Grid
                        marginTop={ 1 }
                        textAlign="end"
                    >
                        <Button 
                            sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText' }}
                            disableRipple
                            color="secondary"
                            size='large'
                            type='submit'
                            disabled={ isSubmitting }
                        >
                            Save
                        </Button>
                    </Grid>
                </form>
                <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={ open }
                autoHideDuration={ 2000 }
                onClose={ handleClose }
                message="Name updated in Firebase!"
                />
            </>
        </ProtectedLayout>
    )
}
