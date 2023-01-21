import { Link } from "react-router-dom"
import { HomePage } from '../routes/HomePage'
import history from "../utils/history"

export const RegisterModal = (props) => {
  return (
  <>
    <div className="SignUpModal h-[38rem] lg:h-[40rem] 2xl:h-[42rem] w-3/4 md:w-5/12 lg:1/3 2xl:w-1/4 bg-white m-auto rounded-lg pb-8">
      <div className="SignUpInput grid h-[85%] pt-8 lg:pt-10 px-5 lg:px-10">
        <div className="SignUpTitle text-center text-[2rem] lg:text-[2.3rem] 2xl:text-[2.8rem]">Cubby Sign Up</div>
          <div className="NameWrapper text-[1.1rem] lg:text-[1.2rem] text-center">
            <input type='text' id='Firstname' name='Firstname' placeholder="First Name"
                   className="Firstname border rounded-full w-11/12 p-4 h-[2.2rem] lg:h-[3rem]"
                   onChange={props.funcs.handleFirstname}/>
          </div>
          <div className="NameWrapper text-[1.1rem] lg:text-[1.2rem] text-center">
            <input type='text' id='Lastname' name='Lastname' placeholder="Last Name"
                   className="Lastname border rounded-full w-11/12 p-4 h-[2.2rem] lg:h-[3rem]"
                   onChange={props.funcs.handleLastname}/>
          </div>
          <div className="EmailWrapper text-[1.1rem] lg:text-[1.2rem] text-center">
            <input type='email' id='Email' name='Email' placeholder="Email"
                   className="Email border rounded-full w-11/12 p-4 h-[2.2rem] lg:h-[3rem]"
                   onChange={props.funcs.handleEmail}/>
          </div>
          <div className="PhoneNumber text-[1.1rem] lg:text-[1.2rem] text-center">
            <input type='tel' id='Phone Number' name='Phone Number' placeholder="Phone Number (optional)" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required
                   className="Phone Number border rounded-full w-11/12 p-4 h-[2.2rem] lg:h-[3rem]"
                   onChange={props.funcs.handlePhoneNumber}/>
          </div>
          <div className="PasswordWrapper text-[1.1rem] lg:text-[1.2rem] text-center">
            <input type='password' id='Password' name='Password' placeholder="Password"
                   className="Password border rounded-full p-4 w-11/12 h-[2.2rem] lg:h-[3rem]"
                   onChange={props.funcs.handleFirstPassword}/>
          </div>
          <div className="PasswordWrapper text-[1.1rem] lg:text-[1.2rem] text-center">
            <input type='password' id='Password' name='Password' placeholder="Verify Password"
                   style={{borderColor: props.funcs.handlePasswordMatch(props.vars.firstPassword, props.vars.secondPassword)}}
                   className="PasswordVerify focus:outline-none border focus:border-[2px] rounded-full p-4 w-11/12 h-[2.2rem] lg:h-[3rem]"
                   onChange={props.funcs.handleSecondPassword}/>
          </div>
        </div>
      <div className="SignUpButtonWrapper text-center p-[5%]">
        <Link to='/'>
          <button className="SignUpButton border w-[10rem] h-[3rem] text-[1.1rem] rounded-md bg-gradient-to-br from-indigo-200 to-pink-100
                  hover:from-indigo-300 hover:to-pink-200"
                  onClick={() => { props.funcs.postRegister(); history.replace('/') }}>Sign Up</button>
        </Link>
      </div>
    </div>
  </>
  )
}
