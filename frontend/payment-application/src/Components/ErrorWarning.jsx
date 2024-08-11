export function ErrorWarning({message}){
    return(
        <div className="px-5 py-3 rounded-lg shadow-md bg-red-600 text-white text-xl font-mono font-bold flex items-center gap-4">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
            </div>
            <div className="flex flex-col items-start gap-1">
                <div className="text-2xl">Error!</div>
                <div>{message}</div>
            </div>
        </div>
    )
}

