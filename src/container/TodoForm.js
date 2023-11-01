
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControlLabel, Switch } from '@mui/material';

export default function TodoForm({onHandleSubmit,updateData,handleClose1,open,handleClickOpen1}) {
    useEffect (() => {
       if(updateData){
        handleClickOpen1()
        setValues(updateData)
       }

    } , [updateData])
    let todoSchema = yup.object().shape({
        title: yup.string()
            .required('Please enter title')
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            status: false
        },
        validationSchema: todoSchema,
        onSubmit: (values, action) => {
            console.log(values);
            onHandleSubmit(values)  // Lifiting State Up.....
            action.resetForm()
            handleClose1() // Lifiting State Up.....
        }
    });
    

    const { values, errors, touched, handleBlur, handleSubmit, handleChange ,setValues} = formik;
    return (
        <React.Fragment>
          
            <Dialog open={open} onClose={handleClose1}> 
                <DialogTitle>Todo</DialogTitle>
                <DialogContent>
                    <form method='post' onSubmit={handleSubmit}>
                        <TextField
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.title}
                        />
                        <p className='error'>{errors.title && touched.title ? errors.title : ''}</p>

                        <FormControlLabel
                            control={<Switch defaultChecked={values.status ? true : false} />}
                            id='status'
                            name='status'
                            label="Todo Status"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.status}
                        />

                        <DialogActions>
                            <Button onClick={handleClose1}>Cancel</Button>
                            <Button type='submit'>{updateData ? "Update" : "Add"}</Button>
                        </DialogActions>
                    </form>
                </DialogContent>


            </Dialog>
        </React.Fragment>
    );
}




