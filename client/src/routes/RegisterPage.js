import { React, useState } from "react"
import { Link } from "react-router-dom"
import { HomePage } from './HomePage'
import history from "../utils/history"

export const RegisterPage = (props) => {

  const handlePasswordMatch = (a, b) => {
    if(a === '' || b === '') return ''
    if(a === b) {
      return '#00FF00'
    } else {
      return '#FF0000'
    }
  }

  const [firstPassword, setFirstPassword] = useState('')
  const handleFirstPassword = (e) => {
    setFirstPassword(e.target.value)
  }
  const [secondPassword, setSecondPassword] = useState('')
  const handleSecondPassword = (e) => {
    setSecondPassword(e.target.value)
  }

  const [linkPath, setLinkPath] = useState('/register')
  const handleLinkPath = (path) => {
    setLinkPath(path)
  }

  return (
    <>
      <div className="SignUpPage bg-gradient-to-br from-indigo-500 to-pink-300 min-h-screen grid">
        <div className="SignUpModal h-[38rem] lg:h-[40rem] 2xl:h-[42rem] w-3/4 md:w-5/12 lg:1/3 2xl:w-1/4 bg-white m-auto rounded-lg pb-8">
          <div className="SignUpInput grid h-[85%] pt-8 lg:pt-10 px-5 lg:px-10">
            <div className="SignUpTitle text-center text-[2rem] lg:text-[2.3rem] 2xl:text-[2.8rem]">Cubby Sign Up</div>
            <div className="NameWrapper text-[1.1rem] lg:text-[1.2rem] text-center">
              <input type='text' id='FirstName' name='FirstName' placeholder="FirstName" className="FirstName border rounded-full w-11/12 p-4 h-[2.2rem] lg:h-[3rem]"/>
            </div>
            <div className="NameWrapper text-[1.1rem] lg:text-[1.2rem] text-center">
              <input type='text' id='LastName' name='LastName' placeholder="LastName" className="LastName border rounded-full w-11/12 p-4 h-[2.2rem] lg:h-[3rem]"/>
            </div>
            <div className="PhoneNumber text-[1.1rem] lg:text-[1.2rem] text-center">
              <input type='tel' id='Phone Number' name='Phone Number' placeholder="Phone Number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required
                     className="Phone Number border rounded-full w-11/12 p-4 h-[2.2rem] lg:h-[3rem]"/>
            </div>
            <div className="EmailWrapper text-[1.1rem] lg:text-[1.2rem] text-center">
              <input type='email' id='Email' name='Email' placeholder="Email" className="Email border rounded-full w-11/12 p-4 h-[2.2rem] lg:h-[3rem]"/>
            </div>
            <div className="PasswordWrapper text-[1.1rem] lg:text-[1.2rem] text-center">
              <input onChange={handleFirstPassword} type='password' id='Password' name='Password' placeholder="Password"
                     className="Password border rounded-full p-4 w-11/12 h-[2.2rem] lg:h-[3rem]"/>
            </div>
            <div className="PasswordWrapper text-[1.1rem] lg:text-[1.2rem] text-center">
              <input onChange={handleSecondPassword} type='password' id='Password' name='Password' placeholder="Verify Password"
                    style={{borderColor: handlePasswordMatch(firstPassword, secondPassword)}}
                    className="PasswordVerify focus:outline-none border focus:border-[2px] rounded-full p-4 w-11/12 h-[2.2rem] lg:h-[3rem]"/>
            </div>
          </div>
          <div className="SignUpButtonWrapper text-center p-[5%]">
            <Link to='/' element={<HomePage/>}>
            <button className="SignUpButton border w-[10rem] h-[3rem] text-[1.1rem] rounded-md bg-gradient-to-br from-indigo-200 to-pink-100
                               hover:from-indigo-300 hover:to-pink-200"
              onClick={() => { props.loggedInChange(); history.replace('/') }}>Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
