import React, { useEffect } from 'react'
import "./Login.css"

import { useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider,useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import { useAuth } from './Auth';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Login = () => {

	let {settokenInLs,setuserIdInLs}=useAuth()

	const gLogin=useGoogleLogin({
		onSuccess:async (credentialResponse)=>{
			await handalSuccess(credentialResponse)},
	
			onError:() => {
				toast.error("Login Failed")
					console.log('Login Failed')
			}
	})
	
	const [data, setdata] = useState({})
	const [isloading,setisloading]=useState(false)
	let navigate=useNavigate()
	
useGSAP(()=>{
gsap.from(".card",{y:-100,duration:2,opacity:0,ease:"bounce"})
})

	const handalSuccess=async (data)=>{
		//console.log(data);
		
		setisloading(true)
		let details=jwtDecode(data.credential)

	let email=details.email
	let url=import.meta.env.VITE_tokenverify
	//console.log(url);
	
		let res=await fetch(url,{
			method:"post",
  headers: {
    "Content-Type": "application/json",
  },
			body:JSON.stringify({Email:email}),credentials:"include"
		})
		//console.log(res);
		
		let resd=await res.json()
console.log(resd);

		if(resd.Emailexist ){
			toast.success("Login Successful!",{className:"test"})

		}else 	if(res.status==401){
			toast.warn(resd.mes,{className:"test"})
		}else 	if(res.status==400){
			toast.error(resd.mes,{className:"test"})
		}else{
			toast.warn("This Email Not Resister!",{className:"test"})
		}
				setisloading(false)

	}

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
	toast.error("Please,Enter Valid Email")
}
}


 
	async function sendit(){
		setisloading(true)
		
		let dataform=document.querySelector(".form")
  let data=new FormData(dataform)
		let url=import.meta.env.VITE_login

		let res=await fetch(url,{method:"post",credentials:"include", body:data})
		let resd=await res.json()
  
		
		//console.log(resd);
		console.log(res.cookies);
		

		if(res.status==200){

				toast.success(resd.message,{className:"test"})

			
		}else 	if(res.status==401){
			toast.warn(resd.message,{className:"test"})
		}else 	if(res.status==400){
			toast.error(resd.message,{className:"test"})
		}
		else{
			toast.error("Internal Server Error!",{className:"test"})
		}

setisloading(false)
	}




	if(isloading){
		return(
			<div className="center2">
	<div className="loader">
					<span className="loader-text">Loading</span>
							<span className="load"></span>
			</div>
		</div>)
	}

		return (
			<>
				<div className="goback">
									<NavLink to="/"><button><i className="fa-solid fa-house"></i></button></NavLink>
								</div>
<div className="containers">


	<div className="card">
 
	<div className="main">

		<h2>Login</h2>

		<form method='post' className='form' onSubmit={(event)=>{
handelit(event)
		}}>
			<div className="input-div">
				<input type="text" id='em' name='Email' required autoComplete='off'/>
	
				<label htmlFor="em">Email</label>
				<i className='fa-regular fa-envelope' htmlFor="em"  onClick={()=>{
	document.querySelectorAll("input")[0].focus()
}}></i>
			</div>

				<div className="input-div">
				<input type="password" id='pas' name='Password' required autoComplete='off' />

				<label htmlFor="pas">Password</label>
				<i className='fa-solid fa-unlock-keyhole' htmlFor="pas" style={{marginTop:"0.3rem"}} onClick={()=>{
	document.querySelectorAll("input")[1].focus()
}}></i>
			
				</div>
				<NavLink to={"/ForgetPassword"}><p id='f'>Forget Password</p></NavLink>

				<div className="input-button">
				<button type="submit">Login</button></div>


				<div className="text">
			<p>Don't have a Profile? <NavLink to="/Create">Create</NavLink></p></div>



		</form>
		<p id='gp'>--------------OR--------------</p>
		<div id="gl">
		<GoogleOAuthProvider clientId={import.meta.env.VITE_clientId}>
<GoogleLogin  
  onSuccess={async (credentialResponse)=>{
  await handalSuccess(credentialResponse)}
}
  onError={() => {
    console.log('Login Failed')
				toast.error("Login Failed",{className:"test"})
  }}
/>
  </GoogleOAuthProvider>
</div>

{/*<button onClick={gLogin} id='gb'><img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google" /> Sign In with Google</button>*/}


	</div>




	
	
	</div>


	
	







</div>

<ToastContainer/>
			</>
		)
}

export default Login