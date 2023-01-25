import { CubbyNav } from '../components/CubbyNav.js'

export const Home = (props) => {

  let vars = props.vars
  let funcs = props.funcs

  return (
    <>
    <CubbyNav vars={vars} funcs={funcs} />
    <div className="HomePage text-center my-[3%] text-[3rem] font-lora">
      <div>Welcome, {props.vars.user.firstname}</div>
    </div>
    </>
  )
}
