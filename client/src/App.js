import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import decode from 'jwt-decode'

import { get } from './utils/fetch'

import { LoginPage } from './routes/LoginPage'
import { HomePage } from './routes/HomePage'
import { GroupPage } from './routes/GroupPage'
import { ErrorPage } from './routes/404'
import { RegisterPage } from './routes/RegisterPage'

const App = () => {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const [JWT, setJWT] = useState('')
  const Login = (token) => { setUser(decode(token)); setJWT(token) }
  const Logout = () => setUser(null)

  useEffect(() => {
    (async function onLoad() {
      try {
        await get('/refresh').then(jwt => {
          if(jwt.success === 'authenticated') Login(jwt.token)
          setLoading(false)
        })
      } catch (err) { console.error(err) }
    })()
  })

  let vars = {
    user: user,
    JWT: JWT
  }

  let funcs = {
    Login: Login,
    Logout: Logout
  }

  if(loading) {
    return (<></>)
  } else { 
  return (
    <>
    <Routes>
      <Route path='/' element={ user !== null ? <HomePage vars={vars} funcs={funcs}/> : <LoginPage vars={vars} funcs={funcs} /> }/>
      <Route path={'/group/:id'} element={ user !== null ? <GroupPage/> : <LoginPage vars={vars} funcs={funcs} /> }/>
      <Route path='/register' element={ <RegisterPage vars={vars} funcs={funcs} />}/>
      <Route path='/*'element={ <ErrorPage/> }/>
    </Routes>
    </>
  )}
}

export default App
