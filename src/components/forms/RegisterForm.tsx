import React from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

import { register } from "../../services/authService";
import { AxiosResponse } from "axios";


const registerForm = () => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        age: 18
    }

    //Yup schema validator
    const registerSchema = Yup.object().shape({
        name: Yup.string().min(6, 'Username must have 6 letters minimum').max(14, 'User name must have 14 latter max').required('Username is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password too short (6)').required('Password is required'),
        confirm: Yup.string().when("password", {
             is: (value: string) => (value && value.length > 0 ? true: false),
             
            })
    })

}