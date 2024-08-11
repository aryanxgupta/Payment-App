import { useEffect, useState } from "react";
import { BottomWarning } from "./BottomWarning";
import { Button } from "./Button";
import { Heading } from "./Heading";
import { InputBox } from "./InputBox";
import { ErrorWarning } from "./ErrorWarning";
import { SuccessWarning } from "./SuccessWarning"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SendMoneyPage(){
    const [successMsg, setSuccessMsg] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [error, setError] = useState(false)
    const[reciever, setReciever] = useState("")
    const[id, setId] = useState("")
    const[amount, setAmount] = useState(0)
    const navigate = useNavigate()

    async function showSuccessWarning() {
        setSuccessMsg(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setSuccessMsg(false);
    }
    

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
                    try{
                        const response = await axios.post('https://payment-app-1-p5m1.onrender.com/api/v1/account/transfer',{
                            to: id, 
                            amount: amount
                        }, {
                            headers:{
                                Authorization: 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        
                        await showSuccessWarning()
                        navigate('/dashboard')      
                    }catch(err){
                        setError(true)
                        setErrMsg(err.response.data.message)
                        setTimeout(()=> setError(false), 2000)
                    }
                    
                }} />
                <BottomWarning label="Cancel Transaction?" text="Cancel" to="/dashboard" />
            </div>
            {successMsg && <div className='absolute top-0 left-1/2 translate-x-[-50%]'>
                <SuccessWarning message="Transaction completed successfully" />
            </div>}
            {error && <div className='absolute top-0 left-1/2 translate-x-[-50%]'>
                <ErrorWarning message={errMsg} />
            </div>}
        </div>
    )
}