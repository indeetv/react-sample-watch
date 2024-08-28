import React, { useEffect } from "react";
import LoginLayout from "../components/Login/Login";
import {myFetch} from "../lib/myFetch"

export default function Login(){
    const api = new myFetch();
    useEffect(()=>{
        
    },[])
    return(
        <LoginLayout/>
    )
}