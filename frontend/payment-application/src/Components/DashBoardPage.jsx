import { AppBar } from "./AppBar";
import { Balance } from "./Balance";
import { Users } from "./Users";

export function DashboardPage(){
    const arr = [{
        firstName: "Aryan", 
        lastName: "Gupta"
    }, {
        firstName: "Aryan", 
        lastName: "Gupta"
    }, {
        firstName: "Aryan", 
        lastName: "Gupta"
    }]
    return(
        <div className="flex flex-col items-center ">
            <AppBar />
            <Balance />
            <Users users={arr}/>
        </div>
    )
}

