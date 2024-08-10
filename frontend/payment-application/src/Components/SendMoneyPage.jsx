import { useEffect, useState } from "react";
import { BottomWarning } from "./BottomWarning";
import { Button } from "./Button";
import { Heading } from "./Heading";
import { InputBox } from "./InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SendMoneyPage(){
    const[reciever, setReciever] = useState("")
    const[id, setId] = useState("")
    const[amount, setAmount] = useState(0)
    const navigate = useNavigate()

    useEffect(()=>{
        setReciever(localStorage.getItem('full-name'))
        setId(localStorage.getItem('id'))
        // localStorage.removeItem('full-name')
        // localStorage.removeItem('id')
    }, [])

    return(
        <div className='w-[100vw] h-[100vh] bg-[#CBF3F0] flex justify-center items-center'>
            <div className="container bg-[#FFFFFF] w-[80vw] md:w-[50vw] lg:w-[30vw] rounded-2xl shadow-lg py-5">
                <Heading label="Send Money" />
                <div className="px-3 text-[#003049]">
                    <div className='text-lg font-sans font-semibold px-3 mt-2 py-1'>To</div>
                    <div className='px-3'>
                    <input type="text" value={reciever} className='w-[100%] shadow px-3 py-3 rounded-xl outline-none border-2 border-solid border-[#DCDCDC] font-mono' disabled/>
                    </div>
                </div>
                <InputBox label="Amount" placeholder="0" onChange={(e)=>{
                    setAmount(parseInt(e.target.value))
                }}/>
                <Button label="Send" onClick={async()=>{
                    const response = await axios.post('http://localhost:3000/api/v1/account/transfer',{
                        to: id, 
                        amount: amount
                    }, {
                        headers:{
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    navigate('/dashboard')
                    
                }} />
                <BottomWarning label="Cancel Transaction?" text="Cancel" to="/dashboard" />
            </div>
        </div>
    )
}