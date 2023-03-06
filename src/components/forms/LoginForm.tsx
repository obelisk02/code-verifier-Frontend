import React from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

import { login } from "../../services/authService";


//definir el esquema de validacion con Yup
const loginScheme = Yup.object().shape({
    email: Yup.string().email('Invalid Email Formar').required('Email is required'),
    password: Yup.string().required('Password is required')
})


//login component
const loginForm = () => {

    //define new credentials
    const initialCredentials = {
        email: '',
        password: ''
    }
    

    return (
        <div>
            <h4>Login form</h4>
            {/*Formik component*/}
            <Formik initialValues = {initialCredentials}
            validationSchema= {loginScheme}
            onSubmit= { async(values)=>{
                await new Promise((response)=> setTimeout(response, 2000));
                alert(JSON.stringify(values, null,2));
                console.table(values);
            }}>

            {
                ({values, touched, errors, isSubmitting, handleChange, handleBlur}) => (

                    
                    <Form>
                    {/*Email*/}
                        <label htmlFor="Email">Email</label>
                        <Field id='email' type='email' name='email' placeholder='example@mail.com'></Field>

                    {/*Email Errors */}
                    {
                        errors.email && touched.email && (
                            <ErrorMessage name="email" component='div'></ErrorMessage>
                        )
                    }


                    {/*Password*/}
                        <label htmlFor="password">Password</label>
                        <Field id='password' type='password' name='password'></Field>

                    {/*Password Errors */}
                    {
                        errors.password && touched.password && (
                            <ErrorMessage name="password" component='div'></ErrorMessage>
                        )
                    }

                    {/*Submit form*/}
                    <button type="submit">Login</button>

                    {/*Message form submitting*/}
                    {
                        isSubmitting ? (<p>Checking credentials...</p>) : null
                    }
                    </Form>
                )
            }
                
            </Formik>
        </div>


    )
}

export default loginForm