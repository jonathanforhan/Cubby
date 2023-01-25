import { ReactComponent as CogIcon } from '../../icons/cog.svg'

export const CubbiesTiles = (props) => {
  return (
  <div className="w-[350px] m-2 py-8 px-8 max-w-sm bg-white rounded-sm shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
    <div className="space-y-2 sm:text-left flex flex-col">
      <p className="font-medium">{props.name}</p>
      <div className="space-y-0.5">
        <p className="font-roboto text-lg text-slate-500 font-semibold">{props.description}</p>
      </div>
      <div className='flex'>
        <button className="bg-blue-500 text-white px-2 rounded-sm text-[1.3rem] mx-1">View</button>
        <button className="w-[1.8rem] h-[1.8rem] ml-auto just"><CogIcon/></button>
      </div>
    </div>
    </div>
  )
}
