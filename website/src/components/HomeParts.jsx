import React from 'react'
import Head from './Head'
import HeadButtons from './HeadButtons'
import Footer from './Footer'
import { useAuth } from './Auth'
import { useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'


const HomeParts = () => {


const {carddata,setcarddata,setisOk,isOk}=useAuth()
const [isloading,setisloading]=useState(true)
const [isError,setisError]=useState(false)

	let api=import.meta.env.VITE_backendurl
	const apifetch=async ()=>{

		try {
			setisloading(true)
  let res=await fetch(api,{credentials:"include"})
		let data=await res.json()
 

	if(data.isVerify){
		setcarddata(data.test)
setisOk(true)
	}else{
		setisOk(false)
	 
		
		if(data.test){
					setcarddata(data.test)
		}else{
setcarddata([])}

}
setisloading(false)




		} catch (error) {
			setisloading(false)
			setisError(true)
		}
		
	}
useEffect(()=>{
apifetch()

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

		return (
			<>

<HeadButtons/>
<Head/>
<Footer/>




			</>
		)
}

export default HomeParts