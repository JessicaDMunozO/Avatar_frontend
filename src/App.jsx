import React, { useState } from 'react'

import './App.css'

import Login from './components/Login/Login'
import Menu from './components/Menu/Menu'
import Profile from './components/Profile/Profile'
import MainPage from './components/MainPage/MainPage'

import { AuthenticatedTemplate, useMsal } from "@azure/msal-react"
import { loginRequest } from "./authConfig";
import { callMsGraph } from './graph'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

// Profile user data
const ProfileContent = () => {
    const { instance, accounts } = useMsal()
    const [graphData, setGraphData] = useState(null)

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response))
        })
    }

    return (
        <>
            { graphData ? <Profile graphData={graphData} /> : RequestProfileData() } 
        </>
    )
}

const App = () => {
    return (
        <main>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <AuthenticatedTemplate>
                        <Route path="/mainPage">
                            <Menu />
                            <MainPage />
                        </Route>
                        <Route path="/profile">
                            <Menu />
                            <ProfileContent />
                        </Route>
                    </AuthenticatedTemplate>
                </Switch>
            </Router>
        </main>
    )
}

export default App