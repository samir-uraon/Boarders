import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'

const ForgetPassword = () => {

	const [isloading,setisloading]=useState(false)
	let navigate=useNavigate()


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
		let url=import.meta.env.VITE_forgetpassword

		let res=await fetch(url,{method:"post",body:data,credentials:"include"})
		let resd=await res.json()
		
console.log(resd);

			if(resd.Emailexist){
				toast.success("Link Send in Your Email")
				setisloading(false)
			}
			else if(res.status==500){
							toast.error("Internal Server issue!")
							setisloading(false)
			}
		else{
			toast.error("This Email not Resister")
			setisloading(false)
		}


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
								<button onClick={()=>{navigate(-1)}}><i className="fa-solid fa-arrow-left"></i> Go Back</button>
								</div>
<div className="containers">
	<div className="card main2">
	<div className="main">

		<h2>Password Reset</h2>

		<form  className='form' onSubmit={(event)=>{
handelit(event)
		}}>
			<div className="input-div">
				<input type="text" id='em' name='Email' required autoComplete='off' />
	
				<label htmlFor="em">Email</label>
				<i className='bx bxs-envelope' htmlFor="em" onClick={()=>{
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

export default ForgetPassword