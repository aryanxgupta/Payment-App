export function UserLogo({firstName}){
    const char = firstName[0] 
    return(
        <div className="h-10 w-10 rounded-[50%] bg-[#e01a4f] text-white font-bold text-2xl flex items-center justify-center">
            {char.toUpperCase()}
        </div>
    )
}