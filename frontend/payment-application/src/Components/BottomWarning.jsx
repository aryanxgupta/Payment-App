import { Link } from "react-router-dom"
export function BottomWarning({label, text, to}){
    return(
      <div className='font-mono text-[#333333] text-sm justify-center flex items-center gap-2'>
        <div>
          {label}
        </div>
        <div>
          <Link to={to} className='underline text-blue-700'>{text}</Link>
        </div>
      </div>
    )
}