import { HomeNav } from '../components/HomeNav.js'

export const HomePage = (props) => {

  let vars = props.vars
  let funcs = props.funcs

  return (
    <>
    <HomeNav vars={vars} funcs={funcs} />
    <div className="HomePage text-center my-[5%] text-[3rem] font-lora">
      <div>Welcome, {props.vars.user.firstname}</div>
    </div>
    </>
  )
}
