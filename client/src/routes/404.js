import { Link } from "react-router-dom"
import history from "../utils/history"

export const ErrorPage = () => {
  return (
    <>
      <div className="ErrorPage bg-gradient-to-br from-indigo-500 to-pink-300 min-h-screen grid">
        <div className="ErrorModal h-[7rem] lg:h-[8rem] 2xl:h-[9rem] w-3/4 md:w-5/12 lg:1/3 2xl:w-1/4 bg-white m-auto rounded-lg pb-8 justify-center">
          <div className="ErrorTitle font-dm mt-[1vh] text-center text-[2rem] lg:text-[2.3rem] 2xl:text-[2.8rem]">404 not found</div>
          <div className="LinkWrapper text-center py-[2%]">
          <Link to='/'>
            <button className="LoginButton border w-[8rem] h-[2.4rem] text-[1.1rem] rounded-md bg-gradient-to-br from-indigo-200 to-pink-100
                    hover:from-indigo-300 hover:to-pink-200"
                    onClick={() => history.replace('/')} >Return Home</button>
          </Link>
          </div>
        </div>
      </div>
    </>
  )
}
