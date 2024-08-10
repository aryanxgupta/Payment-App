export function AppBar(){
    return(
        <div className="flex w-[90%] items-center justify-between border-b-2 border-solid border-[#bfc0c0] p-6 text-[#2d3142]">
            <div className="text-2xl font-bold font-mono">Swift Pay</div>
            <div className="flex items-center gap-2">
                <div className="text-2xl font-bold font-mono">Hello</div>
                <div className="rounded-full p-2 bg-[#e01a4f]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-8 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}