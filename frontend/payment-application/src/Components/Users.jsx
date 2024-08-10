import { useEffect, useState } from "react";
import { InputBox } from "./InputBox";
import { UserLogo } from "./UserLogo"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Users(){
    const[users, setUsers] = useState([])
    const[filter, setFilter] = useState("")
    const navigate = useNavigate()    
    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/user/bulk?filter='+ filter,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response)=>{
            setUsers(response.data.message)
        })
    }, [filter])
    return(
        <div className="w-[90%] mt-11">
            <div>
                <InputBox label="Users" placeholder="Search user" onChange={async (e)=>{
                    setFilter(e.target.value)
                }}/>
            </div>
            <div className="p-3 mt-16">
                {users.map((user, index)=>(
                    <div key={index} className="flex items-start justify-between p-2">
                        <div className="flex items-center gap-5">
                            <UserLogo firstName={user.firstName} />
                            <div className="text-2xl font-mono">{user.firstName} {user.lastName}</div>
                        </div>
                        <div>
                            <button className="bg-[#e01a4f] text-white p-3 rounded-xl font-bold text-xl" onClick={()=>{
                                localStorage.setItem('id', user.id)
                                localStorage.setItem('full-name', `${user.firstName} ${user.lastName}`)
                                navigate('/SendMoney')
                            }}>Send Money</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}