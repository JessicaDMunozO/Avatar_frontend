import React from 'react'

import './App.css'

import Login from './components/Login/Login'
import Menu from './components/Menu/Menu'
import Profile from './components/Profile/Profile'
import MainPage from './components/MainPage/MainPage'

import { AuthenticatedTemplate } from "@azure/msal-react"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

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
                            <Profile />
                        </Route>
                    </AuthenticatedTemplate>
                </Switch>
            </Router>
        </main>
    )
}

export default App