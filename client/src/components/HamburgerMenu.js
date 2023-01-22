import { useState } from "react"
import { Link } from "react-router-dom"

import { ReactComponent as BellIcon } from '../icons/bell.svg'
import { ReactComponent as MessengerIcon } from '../icons/messenger.svg'
import { ReactComponent as CaretIcon } from '../icons/caret.svg'
import { ReactComponent as PlusIcon } from '../icons/plus.svg'
import { ReactComponent as CogIcon } from '../icons/cog.svg'
import { ReactComponent as ChevronIcon } from '../icons/chevron.svg'
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg'
import { ReactComponent as BoltIcon } from '../icons/bolt.svg'

export const HamburgerMenu = (props) => {
  return (
    <>
      <MenuButton url={props.url} alt={props.alt}>
        <DropdownMenu></DropdownMenu>
      </MenuButton>
    </>
  )
}

const MenuButton = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className="Profile my-auto ml-auto" onClick={() => setOpen(!open)}>
        <img src={props.url} alt={props.alt}
        className='ProfilePic text-[1.2rem] h-[2.5rem] rounded-full'/>
      </button>
      { open && props.children }
    </>
  )
}

const DropdownMenu = () => {

  const DropdownItem = (props) => {
    return (
      <Link to={props.link} className="LinkContainer flex text-[1rem] my-[4px] hover:font-bold">
        <span className="icon-button w-[1rem] translate-y-1 mr-[4px]">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </Link>
    )
  }

  return (
    <div className="Dropdown absolute top-[50px] w-[180px] bg-white border rounded-md p-[1rem] overflow-hidden
         translate-x-[50vw] min-[550px]:translate-x-[60vw] min-[600px]:translate-x-[64vw] md:translate-x-[66vw]
         min-[700px]:translate-x-[66vw] min-[900px]:translate-x-[72vw] min-[1000px]:translate-x-[76vw]
         min-[1100px]:translate-x-[74vw] min-[1200px]:translate-x-[72vw] min-[1400px]:translate-x-[78vw]
         lg:translate-x-[76vw] xl:translate-x-[80vw] 2xl:translate-x-[81vw]"
    >
      <DropdownItem leftIcon={<BellIcon/>}>Notifications</DropdownItem>
      <DropdownItem leftIcon={<CogIcon/>} link={'/cubbies'}>Settings</DropdownItem>
    </div>
  )
}
