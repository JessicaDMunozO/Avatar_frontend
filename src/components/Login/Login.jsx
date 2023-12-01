import React from 'react'
import logo from '../../images/Logo.png'
import '../../components/Login/Login.css'

import { useMsal } from "@azure/msal-react"

import { Link } from 'react-router-dom'

const Login = () => {
    const { instance } = useMsal()

    const handleLogin = () => {
        instance.loginRedirect()   // Redirect to Azure authentication
    }

    return (
        <div className='bodyLogin'>
             <form className="form_main">
                <div className="logo">
                    <img src={logo} alt="Logo"></img>
                </div>
                <p className="heading">Login to Na'vi</p>
                {/*Redirect to Main Page */}
                <Link to="/mainPage">
                    <button id="button" onClick={handleLogin}>Log in</button>
                </Link>
            </form>
        </div>         
    )
}

export default Login