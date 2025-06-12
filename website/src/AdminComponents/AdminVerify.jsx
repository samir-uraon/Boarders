import React from 'react'
import { useState,useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import Error from '../components/Error';
import "./Admin.css"	
import Dashboard from './Dashboard';
import { AdminAuth } from './AdminAuth';

const AdminVerify = () => {





	const [isError,setisError]=useState(false)
	const [isloading,setisloading]=useState(true)
		const {isadmin,setisadmin}=AdminAuth()
const [isData, setisData] = useState([]);


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
		try {

		setisloading(true)
		
		let dataform=document.querySelector(".form")
		let data=new FormData(dataform)
		let url=import.meta.env.VITE_Admin

		let res=await fetch(url,{method:"post",credentials:"include", body:data})
		let resd=await res.json()
		
		
		//console.log(resd);

		

		if(resd.isVerify){

	setisadmin(true)
setisData(resd.test)
			
		}else 	if(res.status==401){
			toast.info(resd.message,{className:"test"})
		}
		else 	if(res.status==420){
			toast.warn(resd.message,{className:"test"})
		}
			else 	if(res.status==440){
			toast.warn(resd.message,{className:"test"})
		}
			else 	if(res.status==450){
			toast.warn(resd.message,{className:"test"})
		}
		else 	if(res.status==500){
			toast.error(resd.message,{className:"test"})
			setisadmin(false)
		}
		else{
		 setisError(true)
			setisadmin(false)
		}
setTimeout(() => {
	
	setisloading(false)
}, 2500);
			
		} catch (error) {
			setisloading(false)
			setisError(true)
			
			setisadmin(false)
		}
	}

const runfirst= async ()=>{
		try{
		setisloading(true)
		let url=import.meta.env.VITE_Admin
		let res=await fetch(url,{credentials:"include"})
		let resd=await res.json()



console.log(resd);


		if(resd.isVerify){
		
setisData(resd.test)
setisadmin(true)
}else{
	setisData(resd.test)
setisadmin(false)
}
setTimeout(() => {
			
			setisloading(false)
		}, 2500);

	}catch(error){
		//console.log(error.message);
		
		setisloading(false)
		setisError(true)
		setisadmin(false)
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

	

else	if(!isadmin)
		{
			return (
			<>
				<div className="goback">
									<NavLink to="/"><button><i className="fa-solid fa-house"></i></button></NavLink>
								</div>
<div className="containers">


	<div className="card admincard">
	
	<div className="main">

		<h2>Admin</h2>

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
				<input type="password" id='pas' name='Password' minLength={8} required autoComplete='off' />

				<label htmlFor="pas">Password</label>
				<i className='fa-solid fa-unlock-keyhole' htmlFor="pas" style={{marginTop:"0.3rem"}} onClick={()=>{
	document.querySelectorAll("input")[1].focus()
}}></i>
			
				</div>
				<NavLink to={"/Admin/ForgetPassword"}><p id='f' className='af'>Forget Password</p></NavLink>

				<div className="input-button">
				<button type="submit">Login</button></div>


		</form>
		
</div>



	</div>

	</div>

<ToastContainer/>

			</>
		)}
	
	else{
	return	(<Dashboard details={isData}/>)
		}



		
}

export default AdminVerify