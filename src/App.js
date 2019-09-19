import React from 'react';
import './App.css';
import PersonForms from './components/Form'
import axios from 'axios'
import * as Yup from 'yup'
import {withFormik, Form, Field} from 'formik'

function App() {
  return (
    <div className="App">
     <h1>Hello</h1>
     <PersonForms />
    </div>
  );
}

export default App;
