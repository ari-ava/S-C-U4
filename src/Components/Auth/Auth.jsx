import React from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signInWithPopup, signOut} from 'firebase/auth'

import {auth, googleProvider} from "../../Firebase/firebase"

const Auth = () => {

    const[email, setEmail]=useState("");

    const[password, setPassword]=useState("");

    const [user, setUser]=useState(null);

    const Register = async() =>{
        try{
            const userCredential = await
            createUserWithEmailAndPassword(auth,
                email,password)
                setUser(userCredential.user)
                alert("Registro Correcto")
        } catch(error){
            alert("Ono, hay un error", error);
        }
    }
    

  return (
        <div>Auth</div>
  )
}

export default Auth