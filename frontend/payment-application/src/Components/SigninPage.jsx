import { Heading } from './Heading'
import { SubHeading } from './SubHeading'
import { Button } from './Button'
import { BottomWarning } from './BottomWarning'
import { InputBox } from './InputBox'
import { useState } from 'react'
import { ErrorWarning } from './ErrorWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function SigninPage(){
    const [errMsg, setErrMsg] = useState("")
    const [error, setError] = useState(false)
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate()
    return(
        <div className='w-[100vw] h-[100vh] bg-[#CBF3F0] flex justify-center items-center'>
            <div className="container bg-[#FFFFFF] w-[80vw] md:w-[50vw] lg:w-[30vw] rounded-2xl shadow-lg py-5">
                <Heading label="Sign in" />
                <SubHeading label="Enter the details to log in to your account." />
                <InputBox label="Username" placeholder="John" onChange={(e)=>{
                    setUsername(e.target.value)
                }}/>
                <InputBox label="Password" placeholder="abc123" onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <Button label="Sign in" onClick={async ()=>{
                    try{
                        const response = await axios.post('https://payment-app-1-p5m1.onrender.com/api/v1/user/signin', {
                            username, 
                            password
                        })
                        localStorage.setItem('token', response.data.token)
                        navigate('/dashboard')       
                    }catch(err){
                        setError(true)
                        setErrMsg(err.response.data.message)
                        setTimeout(()=> setError(false), 2000)
                    }

                }} />
                <BottomWarning label="Don't have an account" text="Sign up" to="/signup" />
            </div>
            {error && <div className='absolute top-0 left-1/2 translate-x-[-50%]'>
                <ErrorWarning message={errMsg} />
            </div>}
        </div>
    )
}