import React, {useState, useEffect} from 'react'
import {withFormik, Form, Field} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const PersonForms =({values,touched,errors,status})=> {

        const [users, setUsers] = useState([]);
        useEffect(() => {
          if(status) {
            setUsers([...users, status])
          }
        }, [status])
      
   

    return (
        <div className="formCard">
            <Form className="formContainer">
            <h1 className="header">Welcome User</h1>
             <Field type="text" name="name" placeholder="NAME" className="name" />
             {touched.name && errors.name && <p className="error">{errors.name}</p>}

             <Field type="email" name="email" placeholder="EMAIL" className="email" />
             {touched.email && errors.email && <p className="error">{errors.name}</p>}

             <Field type="password" name="password" placeholder="PASSWORD" className ="password"/>
            
             <Field component="select" className="role-drop" name="role" className="dropDown">
                <option>Please Choose an Option</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Data Scientist">Data Scientist</option>
            </Field>
           
          <Field
                className="note"
                component="textarea"
                type="text"
                name="notes"
                placeholder="Notes"
            />
              <label className="checkbox-container">
                Agree to Terms
                <Field
                className="terms"
                type="checkbox"
                name="terms"
                checked={values.terms}
            />
            <span className ="checkmark" />
          </label>
            <button className="submit" type="submit">Submit</button>
            </Form>


            { users.map(user => (
            <div className="list-container">
            <ul key={user.key} className="list">
                <li className="listItem">Name: {user.name}</li>
                <li  className="listItem">Email: {user.email}</li>
                <li  className="listItem">Password: {user.password}</li>
                <li  className="listItem">Role: {user.role}</li>
                <li  className="listItem">Note: {user.notes}</li>
            </ul>
            </div>
           ))}
        </div>
    );
}

/// using mapPropsToValues to map over the values inputted in to the form 

const FormikPersonForms = withFormik({
    mapPropsToValues({name,email,terms,password,role,notes,changepassword }){
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false,
            role: role || '', 
            notes: notes || '',

        }
    },
    ///// handles the SUBMIT  
    handleSubmit(values, {setStatus}){
        // console.log(values)
        /// axios post request from REQRES API 
        axios
        .post("https://reqres.in/api/users/",values)
        .then(res =>{
            ////////setStatus lets us display the data that is submitted 
            setStatus(res.data)

            // console.log("response", res)
        })
        .catch(err => console.log("You have an error stupid", err.res))
    },
   
    /// validation with YUP //////
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Must put in a name"),
        email: Yup.string().required("Must put a valid email"),
        // password: Yup.string().required("This field is required"),
    }),
    
})(PersonForms);
// console.log("this is Higher Order", FormikPersonForms)

export default FormikPersonForms