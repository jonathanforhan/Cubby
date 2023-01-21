import { Link } from "react-router-dom";
import history from '../utils/history'

export const LoginModal = (props) => {
  return (
    <>
    <div className="LoginModal h-[23rem] lg:h-[28rem] 2xl:h-[30rem] w-3/4 md:w-5/12 lg:1/3 2xl:w-1/4 bg-white m-auto rounded-lg pb-8">
      <div className="LoginInput grid h-[70%] pt-8 lg:pt-10 px-5 lg:px-10">
        <div className="LoginTitle text-center text-[2rem] lg:text-[2.3rem] 2xl:text-[2.8rem]">Member Login</div>
          <div className="EmailWrapper text-[1.1rem] lg:text-[1.2rem] text-center">
            <input type='email' id='Email' name='Email' placeholder="Email"
                   className="Email border rounded-full w-11/12 p-4 h-[2.2rem] lg:h-[3rem]"
                   onChange={props.funcs.handleEmail} />
          </div>
          <div className="PasswordWrapper text-[1.1rem] lg:text-[1.2rem] text-center">
            <input type='password' id='Password' name='Password' placeholder="Password"
                   className="Password border rounded-full p-4 w-11/12 h-[2.2rem] lg:h-[3rem]"
                   onChange={props.funcs.handlePassword} />
          </div>
          <div className="RegisterPageLink text-center text-gray-400 text-[.9rem] lg:text-[1rem] hover:text-gray-500">
            <Link to='/register'>Forgot email/password?</Link>
          </div>
        </div>
      <div className="LoginButtonWrapper text-center p-[5%]">
        <Link to='/'>
          <button className="LoginButton border w-[10rem] h-[3rem] text-[1.1rem] rounded-md bg-gradient-to-br from-indigo-200 to-pink-100
                  hover:from-indigo-300 hover:to-pink-200"
                  onClick={() => {props.funcs.postLogin(); console.log(props.vars.user); history.replace('/')}}>Login</button>
        </Link>
      </div>
      <div className="RegisterPageLink text-center text-gray-400 text-[.9rem] lg:text-[1rem] hover:text-gray-500">
        <Link to='/register'>Don't have an account? Register</Link>
      </div>
    </div>
    </>
  )
}
