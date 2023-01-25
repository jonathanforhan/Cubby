import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import decode from 'jwt-decode'

import { get } from './utils/fetch'

import { LoginPage } from './routes/Login'
import { Home } from './routes/Home'
import { CubbiesHome } from './routes/CubbiesHome'
import { Cubbies } from './routes/Cubbies'
import { ErrorPage } from './routes/404'
import { RegisterPage } from './routes/Register'

export const App = () => {

  const windowSize = useWindowSize()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const [JWT, setJWT] = useState(null)
  const Login = (token) => { setUser(decode(token)); setJWT(token) }
  const Logout = () => setUser(null)

  useEffect(() => {
    (async function() {
      try {
        await get('/refresh').then(jwt => {
          if(jwt.success === 'authenticated') Login(jwt.token)
          else Logout()
          setLoading(false)
        })
      } catch (err) { console.error(err) }
    })()
  },[])

  let vars = {
    user: user,
    JWT: JWT,
    windowSize: windowSize,
  }

  let funcs = {
    Login: Login,
    Logout: Logout
  }

  if(!loading) { 
    if(user === null) {
      return (
      <>
      <Routes>
        <Route path={'/'} element={ <LoginPage vars={vars} funcs={funcs} /> } />
        <Route path={'/register'} element={ <RegisterPage vars={vars} funcs={funcs} /> } />
        <Route path={'/*'} element={ <LoginPage/> }/>
      </Routes>
      </>
      )
    } else {
      return (
        <>
        <Routes>
          <Route path={'/'} element={ <Home vars={vars} funcs={funcs}/> } />
          <Route path={'/cubbies'} element={ <CubbiesHome vars={vars} funcs={funcs} /> } />
          <Route path={'/cubbies/:id'} element={ <Cubbies vars={vars} funcs={funcs} /> } />
          <Route path={'/*'} element={ <ErrorPage/> }/>
        </Routes>
        </>
      )}
  }
}

// Hooks
const useWindowSize = () => {
  const [winSize, setWinSize] = useState(undefined, undefined)
  useEffect(() => {
    const handleResize = () => setWinSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  },[])
  return winSize
}
