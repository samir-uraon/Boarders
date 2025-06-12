
import React from 'react'
import { useEffect,useState } from 'react'
import { NavLink, useNavigate ,useParams} from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import { useAuth } from './Auth'
import Error from './Error'

const ResetPassword = () => {
	const [isloading,setisloading]=useState(true)
		const [isError,setisError]=useState(false)
		const [isExpire, setisExpire] = useState(false);
	let navigate=useNavigate()
let params=useParams()



const FormValidation=(a)=>{

	
	let bool=false
	if(a[0].value.length>=8){

		if(a[0].value==a[1].value){
		bool=true
		return {bool,mes:1}
	}
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
}
else if(!FormValidation(a).bool && FormValidation(a).mes==3){
toast.warn("Password Minimun 8 characters",{className:"test"})
}
else if(!FormValidation(a).bool && FormValidation(a).mes==2){
toast.warn("Password and Confirm Password are not same!",{className:"test"})
}
else{
	toast.error("Please,Enter Stronge Password",{className:"test"})
}
}
async function sendit(){
		setisloading(true)
		
		let dataform=document.querySelector(".form")
		let data=dataform[1].value
		let jdata={newpassword:data,token:params.token}
		let url=import.meta.env.VITE_resetpassword
let urlpart=new URLSearchParams(jdata)

let newurl=`${url}?${urlpart}`


		let res=await fetch(newurl,{credentials:"include"})
		let resd=await res.json()
 
		//console.log(resd);
		

			if(res.status==200){
				toast.success(resd.message,{className:"test"})
				setisloading(false)
		
			}
else	if(res.status==400){
				toast.error(resd.message,{className:"test"})
				setisloading(false)
			}
			else {
				toast.error("Token Expires!",{className:"test"})
				setisloading(false)

}
	}



const firstwork2=async ()=>{
	setisloading(true)
	let url=`${import.meta.env.VITE_backendurl}api/${params.id}/verify/${params.token}/reset`
let res=await fetch(url,{credentials:"include"})
		let resd=await res.json()
	 
		
		if(!resd.verify && res.status==420){
			 
			setisExpire(true)
		}
		else if(resd.verify){
			setisError(false)
		}
		else{
			setisError(true)
		}
	setisloading(false)

}


useEffect(()=>{

firstwork2()

},[])




			if(isloading){
		return(
			<div className="center2">
	<div className="loader">
					<span className="loader-text">Loading</span>
							<span className="load"></span>
			</div>
		</div>)
	}

else if(isError){
		return (
		<Error/>
		)
		}
else if(isExpire){
	return (
			<div className="center2">
									<img src="https://static.vecteezy.com/system/resources/previews/017/178/222/original/round-cross-mark-symbol-with-transparent-background-free-png.png" alt="" />
									<h2>Link Expired</h2>
									<button onClick={()=>{navigate("/ForgetPassword")}} style={{backgroundColor:"black"}}>Resend</button>
								</div>
	)
}
		return (
			<>
					<div className="goback">
									<NavLink to="/Login"><button><i className="fa-solid fa-house"></i></button></NavLink>
								</div>
<div className="containers">
	<div className="card main3">
	<div className="main">
<h2>Password Reset</h2>
		<form  method='get' className='form' onSubmit={(event)=>{
handelit(event)
		}}>
			<div className="input-div">
				<input type="password" id='pas' name='Password' required autoComplete='off'/>

				<label htmlFor="pas">New Password</label>
				<i className='fa-solid fa-user-lock' onClick={()=>{
	document.querySelectorAll("input")[0].focus()
}}></i>
				</div>

				<div className="input-div">
				<input type="text" id='cpas' name='Cpassword' required autoComplete='off' />

				<label htmlFor="cpas">Confirm Password</label>
				<i className="fa-solid fa-key" onClick={()=>{
	document.querySelectorAll("input")[1].focus()
}}></i>
			
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

export default ResetPassword