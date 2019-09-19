import React from 'react'
import {withFormik, Form, Field} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const PersonForms =({values,})=> {

    return (

        <div>
            <Form>
             <Field type="text" name="name" placeholder="NAME" />
             <Field type="text" name="email" placeholder="EMAIL" />
             <Field type="password" name="password" />
             <label>
                Terms of Service
                <Field
                type="checkbox"
                name="terms"
                checked={values.terms}
            />
          </label>




            <button>Submit</button>
            </Form>
        </div>
    );
}

const FormikPersonForms = withFormik({
    mapPropsToValues({name,email,terms,password }){
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || '',

        }
    },

    handleSubmit(values){
        console.log(values)
    }
    
})(PersonForms);
// console.log("this is Higher Order", FormikPersonForms)

export default FormikPersonForms