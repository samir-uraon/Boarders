import React from 'react'
import { useState } from 'react'
import {toast,ToastContainer} from "react-toastify"
import { useParams } from 'react-router-dom'
import Error from './Error'


const ReEmailvl = () => {
	const [loading,setloading]=useState(false)
	const [error,seterror]=useState(false)
	let params=useParams()

const resend=async ()=>{
	try {
		
		let url=`${import.meta.env.VITE_backendurl}api/user/${params.id}/resend`
		setloading(true)
		let res=await fetch(url)
		let resd=await res.json()
  if(res.status==200){
toast.success(resd.message)
setloading(false)
		}
		else if(res.status==404){
			toast.warn(resd.message)
			setloading(false)
			seterror(true)
		}
		else if(res.status==420){
			toast.warn(resd.message)
			setloading(false)
		}
		else{
			toast.error("Internal Server Error")
			setloading(false)
		}

	} catch (error) {
		toast.error("Internal Server Error")
		setloading(false)
	}
}

if(loading){
	return (
		<div className="center2">
		<div className="loader">
						<span className="loader-text">Loading</span>
								<span className="load"></span>
				</div>
			</div>
	)
	}

	if(error){
		return (
		<Error/>
		)
		}

		return (
						<div className="center2">
							<img src="https://static.vecteezy.com/system/resources/previews/017/178/222/original/round-cross-mark-symbol-with-transparent-background-free-png.png" alt="" />
							<h2>Link Expired</h2>
							<button onClick={()=>{resend()}} style={{backgroundColor:"black"}}>Resend</button>
						<ToastContainer/>
						</div>
		)
}

export default ReEmailvl