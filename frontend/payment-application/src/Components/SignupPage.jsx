import { Heading } from './Heading'
import { SubHeading } from './SubHeading'
import { Button } from './Button'
import { BottomWarning } from './BottomWarning'
import { InputBox } from './InputBox'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ErrorWarning } from './ErrorWarning'

export function SignupPage(){
    const [errMsg, setErrMsg] = useState("")
    const [error, setError] = useState(false)
    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate()
    return(
        <div className='w-[100vw] h-[100vh] bg-[#CBF3F0] flex justify-center items-center'>
            <div className="container bg-[#FFFFFF] w-[80vw] md:w-[50vw] lg:w-[30vw] rounded-2xl shadow-lg py-5">
                <Heading label="Sign up" />
                <SubHeading label="Enter the details to create a new account." />
                <InputBox label="First Name" placeholder="John" onChange={(e)=>{
                    setFirstName(e.target.value)
                }} />
                <InputBox label="Last Name" placeholder="Doe" onChange={(e)=>{
                    setLastName(e.target.value)
                }}/>
                <InputBox label="Username" placeholder="johnxdoe" onChange={(e)=>{
                    setUsername(e.target.value)
                }} />
                <InputBox label="Password" placeholder="abc123" onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                <Button label="Sign up" onClick={async()=>{
                    try{
                        const response = await axios.post("https://payment-app-1-p5m1.onrender.com/api/v1/user/signup", {
                            firstName,
                            lastName, 
                            username, 
                            password 
                        })
                        console.log(response);
                        
                        localStorage.setItem('token', response.data.token)
                        navigate('/dashboard')
                    }catch(err){
                        setError(true)
                        setErrMsg(err.response.data.message)
                        setTimeout(()=> setError(false), 2000)
                    }
                }} />
                <BottomWarning label="Already a customer" text="Sign in" to="/signin" />
            </div>
            {error && <div className='absolute top-0 left-1/2 translate-x-[-50%]'>
                <ErrorWarning message={errMsg} />
            </div>}
        </div>
    )
}