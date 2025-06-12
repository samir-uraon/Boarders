import React from 'react'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { AdminAuth } from './AdminAuth'

const AdminButtons = () => {

useGSAP(()=>{

	gsap.set(".slidebar",{x:-210,duration:1,opacity:0})

})

const {setisadmin}=AdminAuth()

let navigate=useNavigate()

const logoutfunc=async ()=>{

	let res=await fetch(`${import.meta.env.VITE_adminlogout}`,{credentials:"include"})
 let resd=await res.json()
	
	if(resd.ok=="done"){
		//console.log("done");
		
navigate("/admin")
	}else{
navigate("/admin")
	}


}


		return (
			<>
				<div className="top at">
					<div className="menubtn">
						<p  onClick={()=>{
	gsap.to(".slidebar",{x:0,duration:0.8,opacity:1})
			}} ><i className="fa-solid fa-bars"></i></p>
					
					</div>
						<div className="loginButton adt">
						<button className='note' onClick={()=>{navigate("/admin/NewAdmin")}}><i className="fa-solid fa-user-secret"></i>  New Admin</button>
												<button className='note' onClick={()=>{
													let des=confirm("Are you Leave Here?")
													if(des){
													setisadmin(false)
            logoutfunc()
											} 
												}}><i className="fa-solid fa-right-from-bracket"></i>  Logout</button>

						</div>
					</div>
			</>
		)
}

export default AdminButtons