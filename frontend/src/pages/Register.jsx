import React, { useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'
import Forms from '../components/Forms/Forms'
import { toast } from "react-toastify";
import formText from "../data/formText.json"
const Register = () => {
        const [inputDetails, setInputDetails] = useState({
            fullName:"",
            userName:"",
            email:"",
            password:"",
            confirmPassword:""
        })

        const [loading, setLoading] = useState(false);

  return (
    <div>
         <NavBar hasHiddenAuthButtons/>
         <Forms inputDetails={inputDetails} setInputDetails={setInputDetails} loading={loading} setLoading={setLoading} formText={formText.register} />
         <Footer/>
    </div>
  )
}

export default Register