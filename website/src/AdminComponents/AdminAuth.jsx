import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';


	let admincontext=createContext()

export	const AdminProvider=({children})=>{

	const [isadmin, setisadmin] = useState(false);

return (<admincontext.Provider value={{isadmin,setisadmin}}>
{children}
</admincontext.Provider>)

}


export const AdminAuth=()=>{

	let contextData=useContext(admincontext)

	if(contextData){
		return contextData
	}
	
	else{
		return null
	}

}