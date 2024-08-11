import { useNavigate } from 'react-router-dom'
export function AppBar(){
    const navigate = useNavigate()
    function onClick(){
        localStorage.removeItem('token')
        navigate('/signin')
    }
    return(
        <div className="flex w-[90%] items-center justify-between border-b-2 border-solid border-[#bfc0c0] p-6 text-[#2d3142]">
            <div className="text-2xl font-bold font-mono">Swift Pay</div>
            <div className="flex items-center gap-10">
                <div>
                    <button onClick={onClick} className='p-4 bg-[#e01a4f] text-white font-bold text-lg shadow hover:bg-[#FF9F1C] transition-all duration-100 active:bg-[#FF9F1C] rounded-full'>Log Out</button>
                </div>
            </div>
        </div>
    )
}