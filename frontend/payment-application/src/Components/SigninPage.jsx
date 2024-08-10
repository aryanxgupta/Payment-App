import { Heading } from './Heading'
import { SubHeading } from './SubHeading'
import { Button } from './Button'
import { BottomWarning } from './BottomWarning'
import { InputBox } from './InputBox'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function SigninPage(){
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
                    const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                        username, 
                        password
                    })
                    localStorage.setItem('token', response.data.token)
                    navigate('/dashboard')

                }} />
                <BottomWarning label="Don't have an account" text="Sign up" to="/signup" />
            </div>
        </div>
    )
}