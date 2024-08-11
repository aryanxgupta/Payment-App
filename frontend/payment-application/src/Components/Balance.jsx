import axios from "axios"
import { useEffect, useState } from "react"

export function Balance(){
    const[balance, setBalance] = useState("")
    useEffect(()=>{
        axios.get('https://payment-app-1-p5m1.onrender.com/api/v1/account/balance', {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response)=>{
            setBalance((response.data.balance).toFixed(3))
        })
    }, [])
    return(
        <div className="w-[90%] flex items-center gap-4 text-2xl font-mono font-medium p-6 text-[#4f5d75]">
            <div>Your Balance: </div>
            <div>{balance}</div>
        </div>
    )
}