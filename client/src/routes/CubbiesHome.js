import { useState, useEffect } from 'react'
import { CubbyNav } from '../components/CubbyNav.js'
import { get, post } from '../utils/fetch.js'
import { CubbiesTiles } from '../components/CubbyHome/CubbiesTiles'
import { CubbyToolbar } from '../components/CubbyHome/CubbyToolbar.js'

export const CubbiesHome = (props) => {

  let vars = props.vars
  let funcs = props.funcs

  const [cubbies, setCubbies] = useState(<></>)

  useEffect(() => {
    (async function() {
      try {
        await get('/refresh', null).then(jwt => {
          if(jwt.success === 'authenticated') props.funcs.Login(jwt.token)
          else props.funcs.Logout()
        })
      } catch (err) {console.log(err)}
      try {
        await fetchCubbies()
      } catch (err) {console.log(err)}
    })()
  },[])

  const fetchCubbies = async () => {
    try {
      await get('/api/getCubbies', props.vars.JWT).then(res => {
        if(res.success) getCubbies(res)
        else noCubbies()
      })
    } catch (err) {console.log(err)}
  }

  const getCubbies = (res) => {
    setCubbies(
      <div className="flex flex-wrap justify-center">
        {console.log(res.cubbies.length)}
        {res.cubbies.map(cubby => {
          return (
            <CubbiesTiles
              name={cubby.name}
              description={cubby.description}
            />
          )
        })}
      </div>
    )
  }

  const noCubbies = () => {
    setCubbies(
      <><div className="text-slate-600">No Cubbies... yet!</div></>
    )
  }

  return (
    <>
    <div className='absolute w-[100%] flex flex-col'>
    <CubbyNav vars={vars} funcs={funcs} />
    <div className=' sm:m-4 2xl:my-12 2xl:mx-36 min-h-[85vh] shadow-2xl'>
      <div className="HomePage font-lora text-center text-[3rem]">
        <div className='py-[1%]'>Your Cubbies</div>
      </div>
      <CubbyToolbar
        creator={props.vars.user.email}
        JWT={props.vars.JWT}
        Logout={props.funcs.Logout}
        Login={props.funcs.Login}
        fetchCubbies={fetchCubbies}
        />
      <div className="HomePageCubbies text-center my-[5%] text-[2rem] font-lora flex flex-wrap justify-center">
        {cubbies}
      </div>
    </div>
    </div>
    </>
  )
}
