
import React from 'react'
import { useEffect,useState } from 'react'
import { NavLink, useNavigate ,useParams} from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import { RiLockPasswordLine } from "react-icons/ri";
import { IoKeySharp } from "react-icons/io5";
import { GiHouseKeys } from "react-icons/gi";
import { useAuth } from './Auth'
import Error from './Error'
import "./ChangePassword.css"


const ChangePassword = () => {
	const [isloading,setisloading]=useState(true)
		const [isError,setisError]=useState(false)
	let navigate=useNavigate()
let params=useParams()



const FormValidation=(a)=>{

	
	let bool=false
	if(a[1].value.length>=8){


if(a[1].value==a[2].value){
	
		if(a[0].value!=a[1].value){
		bool=true
		return {bool,mes:1}
	}else{
		
				bool=false
		return {bool,mes:4}
	
	}}
	else{
bool=false
		return {bool,mes:2}
}
	}
else{
bool=false
		return {bool,mes:3}
}

}

const handelit=(event)=>{

	event.preventDefault()
let a=document.querySelectorAll("input")


if(FormValidation(a).bool){
	sendit()
//console.log("sendit");

	
}
else if(!FormValidation(a).bool && FormValidation(a).mes==3){
toast.warn("Password Minimun 8 characters")
}
else if(!FormValidation(a).bool && FormValidation(a).mes==4){
toast.warn("Old Password and New Password are same.")
}
else if(!FormValidation(a).bool && FormValidation(a).mes==2){
toast.warn("Password and Confirm Password are not same!")
}
else{
	toast.error("Please,Enter Stronge Password")
}
}
async function sendit(){
		setisloading(true)
		
		let dataform=document.querySelector(".form")
		let data1=dataform[0].value
let data2=dataform[2].value

		let url=import.meta.env.VITE_backendurl
		
		
		let newurl=`${url}api/id/verify/token${import.meta.env.VITE_ChangePas}`



		let res=await fetch(newurl,{
			method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({old:data1,new1:data2})
		,credentials:"include"})
		let resd=await res.json()
	
			if(res.status==200){
				setisloading(false)
				toast.success("Password Change Successfully",{className:"test"})
			}
			else	if(res.status==250 && resd.reason=="old"){
	setisloading(false)
		toast.warn("Old Password is Not Match",{className:"test"})
			}
			else	if(res.status==404){
	setisloading(false)
			setisError(true)
			}
else	if(res.status==400){
	setisloading(false)
navigate("/Login")
			}
			else {
				toast.error("Internal Server Error!",{className:"test"})
				setisloading(false)

}
	}



const firstwork=async ()=>{
	setisloading(true)
	let url=`${import.meta.env.VITE_backendurl}`
let res=await fetch(url,{credentials:"include"})
		let resd=await res.json()
		setisloading(false)
		if(resd.isVerify){
			setisError(false)
		}else if(res.status==404){
navigate("/Login")
}else{
	setisError(true)
}

}


useEffect(()=>{
	setTimeout(()=>{

		firstwork()

	},2000)

},[])




	if(isloading){
		return(
			<div className="center2 backwhite">
<div className="typewriter">
    <div className="slide"><i></i></div>
    <div className="paper"></div>
    <div className="keyboard"></div>
</div>
		</div>)
	}

if(isError){
		return (
		<Error/>
		)
		}

		return (
			<>
					<div className="gop">
								<div className='sbuts'>
								<button onClick={()=>{navigate(-1)}} id='pb'><i className="fa-solid fa-arrow-left"></i></button>
<button onClick={()=>{navigate("/Profile")}} id='pb3'><i class="fa-solid fa-id-card"></i> Profile</button>
</div>	
												<div id='butsdiv'>	<NavLink to="/Edit_Profile" style={{color:"white"}}><button id="buts"><i className="fa-solid fa-pen-to-square" style={{marginRight:"0.1rem" ,fontSize:"1.5rem"}}></i> Edit Profile</button></NavLink>
													<NavLink to="/Add_Links" style={{color:"white"}}><button id="buts"><i className="fa-solid fa-link"></i>  Add Links</button></NavLink>
							</div>

								</div>
<div className="containers chpc">
<h2>Change Password</h2>
	<div className="card main3 chpm">
	<div className="main">
		<form className='form' onSubmit={(event)=>{
			handelit(event)
		}
		}>
				<div className="input-div">
				<input type="password" id='oldpas' name='oldPassword' required autoComplete='off'/>

				<label htmlFor="oldpas">Old Password</label>
				<RiLockPasswordLine id='i' onClick={()=>{
	document.querySelectorAll("input")[0].focus()
}}/>
				</div>
			<div className="input-div">
				<input type="password" id='pas' name='Password' required autoComplete='off'/>

				<label htmlFor="pas">New Password</label>
				<IoKeySharp id='i'  onClick={()=>{
	document.querySelectorAll("input")[1].focus()
}}/>
				</div>

				<div className="input-div">
				<input type="text" id='cpas' name='Cpassword' required autoComplete='off' />

				<label htmlFor="cpas">Confirm Password</label>
				<GiHouseKeys id='i' onClick={()=>{
	document.querySelectorAll("input")[2].focus()
}}/>
			
				</div>

				<div className="input-button">
				<button type="submit">Reset</button></div>


		</form>
		</div>
		</div>
		</div>
		<ToastContainer/>
		</>
		)

}

export default ChangePassword