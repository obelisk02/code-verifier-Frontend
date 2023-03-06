import React from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

import { login } from "../../services/authService";
import { AxiosResponse } from "axios";


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
                
                login( values.email, values.password).then((response: AxiosResponse)=> {
                    if(response.status === 200){
                        if(response.data.token){
                            sessionStorage.setItem('sessionToken', response.data.token)
                        }else{
                            throw new Error('Invalid token')
                        }

                    } else{
                        throw new Error('Invalid credentials')
                    }
                }).catch((error) => {
                    console.log("[LOGIN ERROR] Something went wrong")
                })
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