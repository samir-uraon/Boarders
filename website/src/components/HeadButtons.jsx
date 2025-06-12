import React from 'react'
import {NavLink} from "react-router-dom"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { toast,ToastContainer } from 'react-toastify'
import "./HeadButtons.css"
import { useState ,useEffect} from 'react'
import { useAuth } from './Auth'

const HeadButtons = () => {
	
	
	const {isOk,removetokenInLs}=useAuth()
	const [isshow, setisshow] = useState(isOk);
	
	gsap.registerPlugin(ScrollTrigger)
	
useGSAP(()=>{
	gsap.from(".loginButton",{opacity:0,duration:2,x:100,ease:"back"})
		gsap.from(".notices",{opacity:0,duration:2,x:-100,ease:"back"})


}) 
 

		return (
			<>
				<div className="top">
					<div className="notices">
			{/*<NavLink to="/Login">	*/}
			<button className='note' onClick={()=>{
					toast.info("This Section was not active",{className:"test"})
				}}><i className='bx bxs-bell' ></i>  Notifications</button>
			{/*</NavLink>*/}

						<NavLink to="/Profile"><button className={isshow?"note2":"hide"}><i className='fa-solid fa-id-card-clip'></i>  Profile</button></NavLink>
						</div>
						<div className="loginButton">
					
					{(!isshow)?(	<NavLink to="/Login" style={{color:"white"}}><button className="lbtn">Login</button></NavLink>):""}
						</div>
					</div>
		</>
		)
}

export default HeadButtons