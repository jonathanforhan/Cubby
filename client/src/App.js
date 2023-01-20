import React, { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import { LoginPage } from './routes/LoginPage'
import { HomePage } from './routes/HomePage'
import { GroupPage } from './routes/GroupPage'
import { ErrorPage } from './routes/404'
import { RegisterPage } from './routes/RegisterPage'

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)
  const loggedInChange = () => loggedIn ? setLoggedIn(false) : setLoggedIn(true)

  return (
    <>
    <Routes>
      <Route path='/' element={ loggedIn ? <HomePage/> : <LoginPage loggedInChange={loggedInChange}/> }/>
      <Route path={'/group/:id'} element={ loggedIn ? <GroupPage/> : <LoginPage loggedInChange={loggedInChange}/> }/>
      <Route path='/register' element={ <RegisterPage loggedInChange={loggedInChange}/>}/>
      <Route path='/*'element={ <ErrorPage/> }/>
    </Routes>
    </>
  )
}

export default App
