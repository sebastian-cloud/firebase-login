import { Backdrop, CircularProgress, Grid, IconButton, TextField, Typography } from '@mui/material'
import { ProtectedLayout } from '../layouts'
import { TodoTable } from '../components'
import { FormikHelpers, useFormik } from 'formik'
import AddIcon from '@mui/icons-material/Add';
import { NewTaskBody } from '../../firebase/firebase.interface';
import { useSelector } from 'react-redux';
import { addTask } from '../../firebase/providers';
import { RootState } from '../../store';
import { useState } from 'react';

const initialData: NewTaskBody = {
    task: ''
}

export const Profile = () => {

    const uid = useSelector(( state: RootState ) => state.auth.uid )
    const [updateTodoTable, setUpdateTodoTable] = useState( false )
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = ( value: boolean ) => {
        setOpen( value );
    };
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
        onSubmit: ( values, Helpers ) => addTaskFromFB( values, Helpers )
    })

    const addTaskFromFB = ( values: NewTaskBody, { setSubmitting }: FormikHelpers<NewTaskBody> ) => {
        handleToggle( true )
        addTask( uid!, values.task )
        setSubmitting( false )
        setUpdateTodoTable( !updateTodoTable )
        resetForm()
        setTimeout(() => {
          handleToggle( false )
        }, 500);
    }

    const validateData = ( values: NewTaskBody ) => {
        let errors: any = {}
        // Email validations
        if( !values.task )
        errors.task = 'This field is required.';
        // Return posible errors
        return errors;
    }

    return (
        <ProtectedLayout>
            <>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Grid 
                    width="100%"                
                    sx={{ mb: 4 }}
                >
                    <form onSubmit={ handleSubmit }>
                        <Grid
                            display="flex"
                            alignItems="center"
                        >
                            <TextField 
                                variant='outlined'
                                placeholder='New Task'
                                type="text"
                                fullWidth
                                name='task'
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                value={ values.task }
                            />
                            <IconButton 
                                sx={{ ml: 1, backgroundColor: 'secondary.main', color: 'secondary.contrastText' }}
                                disableRipple
                                color="secondary"
                                size='large'
                                type='submit'
                                disabled={ isSubmitting }
                            >
                                <AddIcon />
                            </IconButton>
                        </Grid>
                        { errors.task && touched.task && <Typography variant='caption' color="error">{ errors.task }</Typography> }
                    </form>
                </Grid>
                <TodoTable updateTodoTable={ updateTodoTable } handleToggle={ ( value ) => handleToggle( value ) } />
            </>
        </ProtectedLayout>
    )
}
