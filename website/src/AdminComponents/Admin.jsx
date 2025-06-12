import React from 'react'
 
import Error from '../components/Error'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import "./Admin.css"
import AdminSlideBar from './AdminSlideBar'
import AdminButtons from './AdminButtons'
import AdminCard2 from './AdminCard2'

const Admin = () => {

	let navigate=useNavigate()
	const [isloading, setisloading] = useState(true);
const [isData, setisData] = useState([]);
const [isError,setisError,] = useState(false);


const runfirst= async ()=>{
		try{
		setisloading(true)
		let url=import.meta.env.VITE_AdminList
		let res=await fetch(url,{credentials:"include"})
		let resd=await res.json()



//console.log(resd);


		if(resd.isVerify){
		
setisData(resd.test)

}else{
	setisData([])
navigate("/admin")
}
setTimeout(() => {
			
			setisloading(false)
		}, 2000);

	}catch(error){
		//console.log(error.message);
		
		setisloading(false)
		setisError(true)
		 
		}

	}


useEffect(()=>{
	
	runfirst()
},[])

	
	


	if(isloading){
		return(
			<div className="center2 adl">
<div className="loader"></div> 
		</div>)
	}

	else if(isError){
		return(
			<Error/>
		)
	}



		return (
			<>
<AdminSlideBar/>

<div className="dashmain">

<AdminButtons/>
	<div className="center">
<div className="headdiv">
			<h1 className='testh1'>Admins List
</h1>
</div>

	<div className="containerCard adcc">
	{isData.map((card,index)=>{
   return (
			<AdminCard2 key={index} data={card} rank={index+1}/>
			)
	})}



	</div>
			</div>
			</div>
		</>
		)
}



export default Admin