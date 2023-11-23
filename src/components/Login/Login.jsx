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
        <form class="form_main">
            <div class="logo">
                <img src={logo}></img>
            </div>
            <p class="heading">Login to Na'vi</p>
            {/*Redirect to Main Page */}
            <Link to="/mainPage">
                <button id="button" onClick={handleLogin}>Log in</button>
            </Link>
        </form>
    )
}

export default Login