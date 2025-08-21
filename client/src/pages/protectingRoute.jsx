import React,{ useEffect,useState } from "react";
import {Navigate} from "react-router-dom";

const ProtectingRoute = ({children})=>{
    const [isAuthenticated,setAuthenticated]=useState(false);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const verifyUser=async()=>{
            try{
                const res= await fetch("http://localhost:5555/verify",{
                    method:"POST",
                    credentials:"include",
                    headers:{
                        "Content-Type":"application/json",}
                });
                if(res.status === 200){
                    setAuthenticated(true);
                    console.log("User is authenticated");
                }else{
                    console.error("User is not authenticated");
                    setAuthenticated(false);
                    <Navigate to="/login" />
                    return;
                }
            }
            catch(error){
                setAuthenticated(false);
            }finally{
                setLoading(false);
            };
        };
        verifyUser();
    },[]);

    if(loading){
        return (<div>Loading...</div>)
    }
    if(!isAuthenticated){
        return <Navigate to="/login" />; 
    }
    return children;
};

export default ProtectingRoute;