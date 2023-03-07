import React from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { AxiosResponse } from "axios";

import { register } from "../../services/authService";



const registerForm = () => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirm: '', // to confirm password
        age: 18
    }

    //Yup schema validator

    
    const registerSchema = Yup.object().shape({
        name: Yup.string().min(5, 'Username must have 6 letters minimum').max(14, 'User name must have 14 latter max').required('Username is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(5, 'Password too short (6)').required('Password is required'),
        confirm: Yup.string() //.when("password", {
           // is: (value: string | any[]) => (value && value.length > 0 ? true : false),
           // then: Yup.string().oneOf([Yup.ref("password")], '¡Passwords must match!')
       // }).required('You must confirm the password')
        .min(5, 'password short').required('Password is required'),
        age: Yup.number().min(12, 'You must be older than 12 years old').required('Age is required')
    });

    return (
        <div>
            <h4>Register new user</h4>

            {/*Formik wrapper */}
            <Formik
                initialValues={ initialValues}
                validationSchema= { registerSchema}
                onSubmit= { async(values)=>{
                
                    register( values.name, values.email, values.password, values.age).then((response: AxiosResponse)=> {
                        if(response.status === 200){
                                console.log('data enviada')
    
                        } else{
                            throw new Error('Error register')
                        }
                    }).catch((error) => {
                        console.log("[Register ERROR] Something went wrong")
                    })
                }}
                >


{
                ({values, touched, errors, isSubmitting, handleChange, handleBlur}) => (

                    
                    <Form>
                          {/*Name*/}
                          <label htmlFor="name">Name</label>
                        <Field id='name' type='text' name='name' placeholder='Your name'></Field>
                    {
                        errors.name && touched.name && (
                            <ErrorMessage name="name" component='div'></ErrorMessage>
                        )
                    }
                    
                    {/*Email*/}
                        <label htmlFor="email">Email</label>
                        <Field id='email' type='email' name='email' placeholder='example@mail.com'></Field>
                    {
                        errors.email && touched.email && (
                            <ErrorMessage name="email" component='div'></ErrorMessage>
                        )
                    }


                    {/*Password*/}
                        <label htmlFor="password">Password</label>
                        <Field id='password' type='password' name='password'></Field>
                    {
                        errors.password && touched.password && (
                            <ErrorMessage name="password" component='div'></ErrorMessage>
                        )
                    }


                      {/*Confirm*/}
                      <label htmlFor="confirm">Confirm password</label>
                        <Field id='confirm' type='password' name='confirm'></Field>
                    {
                        errors.confirm && touched.confirm && (
                            <ErrorMessage name="confirm" component='div'></ErrorMessage>
                        )
                    }


                      {/*Age*/}
                      <label htmlFor="age">Age</label>
                        <Field id='age' type='number' name='age' placeholder='Age'></Field>
                    {
                        errors.age && touched.age && (
                            <ErrorMessage name="age" component='div'></ErrorMessage>
                        )
                    }

                    {/*Submit form*/}
                    <button type="submit">Register</button>

                    {/*Message form submitting*/}
                    {
                        isSubmitting ? (<p>Sending data...</p>) : null
                    }
                    </Form>
                )
            }
            
                </Formik>
        </div>
    )

}

export default registerForm