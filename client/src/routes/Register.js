import { useState } from "react"
import { RegisterModal } from '../components/RegisterModal.js'
import { post } from "../utils/fetch.js"

export const RegisterPage = (props) => {

  // FORM DATA
  const [firstname, setFirstname] = useState('')
  const handleFirstname = (e) => setFirstname(e.target.value)

  const [lastname, setLastname] = useState('')
  const handleLastname = (e) => setLastname(e.target.value)

  const [email, setEmail] = useState('')
  const handleEmail = (e) => setEmail(e.target.value)

  const [phoneNumber, setPhoneNumber] = useState('')
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value)

  const [firstPassword, setFirstPassword] = useState('')
  const handleFirstPassword = (e) => setFirstPassword(e.target.value)

  const [secondPassword, setSecondPassword] = useState('')
  const handleSecondPassword = (e) => setSecondPassword(e.target.value)

  const handlePasswordMatch = (a, b) => {
    if(a === '' || b === '') return ''
    let color = a === b ? '#00FF00' : '#FF0000'; return color
  }

  let formBody = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    phoneNumber: phoneNumber,
    password: secondPassword
  }

  // POST REQ TO /register AND /auth
  const postRegister = async () => {
    if(firstPassword !== secondPassword) { return alert('Passwords must match') }
    for(let field in formBody) {
      if(!formBody[field]) return alert(`Missing ${field}`)
    }
    if(firstPassword.length < 6) return alert('Password must be at least 6 characters long')
    
    try {
      await post('/register', null, formBody)
    } catch (err) { console.error(err) }
    try {
      await post('/auth', null, formBody).then(jwt => {
        if(jwt.success) props.funcs.Login(jwt.token)
      })
    } catch (err) { console.error(err) }
  }

  let vars = {
    user: props.vars.user,

    formBody: formBody,
    firstPassword: firstPassword,
    secondPassword: secondPassword
  }

  let funcs = {
    postRegister: postRegister,

    handleFirstname: handleFirstname,
    handleLastname: handleLastname,
    handleEmail: handleEmail,
    handlePhoneNumber: handlePhoneNumber,
    handleFirstPassword: handleFirstPassword,
    handleSecondPassword: handleSecondPassword,
    handlePasswordMatch: handlePasswordMatch,
  }

  return (
    <>
    <div className="SignUpPage bg-gradient-to-br from-indigo-500 to-pink-300 min-h-screen grid">
      <RegisterModal vars={vars} funcs={funcs} />
    </div>
    </>
  )

}
