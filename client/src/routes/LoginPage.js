import { useState } from "react"
import { LoginModal } from "../components/LoginModal"

import { post, get } from "../utils/fetch"

export const LoginPage = (props) => {

  const [email, setEmail] = useState('')
  const handleEmail = (e) => setEmail(e.target.value)

  const [password, setPassword] = useState('')
  const handlePassword = (e) => setPassword(e.target.value)

const  postLogin = async () => {
    try {
      await post('/auth', { email, password }).then(jwt => {
        if(jwt.success === 'authenticated') props.funcs.Login(jwt.token)
      })
    } catch (err) { console.error(err) }
  }

  let vars = {
    user: props.vars.user,

    email: email,
    password: password
  }

  let funcs = {
    postLogin: postLogin,

    handleEmail: handleEmail,
    handlePassword: handlePassword
  }

  return (
    <>
      <div className="LoginPage bg-gradient-to-br from-indigo-500 to-pink-300 min-h-screen grid">
        <LoginModal vars={vars} funcs={funcs} />
      </div>
    </>
  )
}
