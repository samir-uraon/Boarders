import React, { useEffect } from 'react'
import { AdminAuth } from './AdminAuth'
import Error from '../components/Error'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'





const NewAdmin = () => {
	let navigate=useNavigate()



const [isload, setisloading] = useState(true);
const [isError, setisError] = useState(false);


const FormValidation=(a)=>{

	let indexr=a.value.indexOf("@")
	let bool=false
	if(["@gmail.com","@outlook.com","@yahoo.com","@jadavpuruniversity.in"].includes(a.value.slice(indexr,a.value.length)) && a.value.slice(0,indexr).length>=5){
		bool=true
		return bool
	}else{
bool=false
return bool
}
}

const handelit=(event)=>{

	event.preventDefault()
let a=document.querySelector("#em")

if(FormValidation(a)){
	sendit()
}
else{
	toast.error("Please,Enter Valid Email",{className:"test"})
}
}
async function sendit(){
		setisloading(true)
		
		let dataform=document.querySelector(".form")
		let data=new FormData(dataform)
		let url=`${import.meta.env.VITE_backendurl}admin/newadmin`

		let res=await fetch(url,{method:"post",body:data,credentials:"include"})
		let resd=await res.json()
		
console.log(resd);

			if(resd.status){
				toast.success("Link Send in This Email",{className:"test"})
				setisloading(false)
			}
				else if(res.status==250){
							toast.warn(resd.mes,{className:"test"})
							setisloading(false)
			}
			else if(res.status==500){
							toast.error("Internal Server issue!",{className:"test"})
							setisloading(false)
			}	else if(res.status==400){
							toast.warn(resd.mes,{className:"test"})
							setisloading(false)
			}
		else{
		setisError(true)
			setisloading(false)
		}


	}


const firsttake=async () => {
			let url=`${import.meta.env.VITE_backendurl}admin/newadmin`

		let res=await fetch(url,{credentials:"include"})
 
		
	
		if(res.status==200){
			setisError(false)
		}

		else{
			setisError(false)
			navigate("/admin")
		}
		setTimeout(()=>{

			setisloading(false)
		},500)
}
useEffect(()=>{

firsttake()
},[])






if(isload){
	return (
			<div className="center2 adl">
<div className="loader"></div> 
		</div>
	)
}
else if(isError){
	return(
<Error/>
	)
}


		return (
			<>
	
				<div className="goback">
								<button onClick={()=>{navigate(-1)}}><i className="fa-solid fa-arrow-left"></i> Go Back</button>
								</div>
<div className="containers">
	<div className="card main2">
	<div className="main">

		<h2>New Admin</h2>

		<form  className='form' onSubmit={(event)=>{
handelit(event)
		}}>
			<div className="input-div">
				<input type="text" id='em' name='Email' required autoComplete='off' />
	
				<label htmlFor="em">Email</label>
				<i className='fa-regular fa-envelope' htmlFor="em" onClick={()=>{
	document.querySelectorAll("input")[0].focus()
}}></i>
			</div>

				<div className="input-button">
				<button type="submit">Submit</button></div>


		</form>
		</div>
		</div>
		</div>
		<ToastContainer/>

			
			</>
		)
}

export default NewAdmin