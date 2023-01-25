import { Link } from "react-router-dom"
import React, { useState } from "react"
import avatar from 'cartoon-avatar'
import { HamburgerMenu } from "./HamburgerMenu"

//import { post } from "../utils/fetch"

export const CubbyNav = (props) => {

  let url = avatar.generate_avatar()
  let alt = props.vars.user.firstname.charAt(0) + props.vars.user.lastname.charAt(0)

  if(props.vars.windowSize.width < 800) {
    return (
      <>
        <nav className="Nav w-full h-[3.2rem] bg-violet-200 px-[5vw] flex static">
          <Link to='/' className="text-black no-underline">
            <div className="Title font-lora text-[2rem]">Cubby</div>
          </Link>
          <HamburgerMenu url={url} alt={alt}/> 
        </nav>
      </> 
    )
  } else {
    return (
      <>
        <nav className="HomeNav w-full h-[3.2rem] bg-violet-200 px-[5vw] flex">
          <Link to='/' className="text-black no-underline">
            <div className="Title font-lora text-[2rem]">Cubby</div>
          </Link>
            <div className="Pipe font-dm text-[1.9rem] ml-[1.2rem]">|</div>
          <Link to='/cubbies' className="CubbiesLink text-black no-underline text-[1.2rem] my-auto mx-[1.2rem] hover:underline">Cubbies</Link>
          <Link to='/' className="PlansLink text-black no-underline text-[1.2rem] my-auto mx-[1.2rem] hover:underline">Plans</Link>
          <Link to='/' className="FeaturesLink text-black no-underline text-[1.2rem] my-auto mx-[1.2rem] hover:underline">Features</Link>
          <HamburgerMenu url={url} alt={alt}/> 
        </nav>
      </>
    )
  }
}
