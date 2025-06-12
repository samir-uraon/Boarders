import React from 'react'
import { useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import Emailvs from './Emailvs'
import ReEmailvl from './ReEmailvl'
import Error from './Error'
import "./Emailverify.css"
import { toast } from 'react-toastify'

const EmailVerify = () => {

const [validurl,setvalidurl]=useState(false)
const [error,seterror]=useState(false)
const [loading,setloading]=useState(true)
let params=useParams()


const fetchapi=async ()=>{

	try {
		let url=`${import.meta.env.VITE_backendurl}api/user/${params.id}/verify/${params.token}`
	let res=await fetch(url)
console.log(res);

 if(res.status==201){
		setvalidurl(false)
setloading(false)
	}
	else if(res.status==200){
		setvalidurl(true)
	setloading(false)}
	else if(res.status==404){
		seterror(true)
		setvalidurl(false)
		setloading(false)
	}
else{
	seterror(true)
	setvalidurl(false)
	setloading(false)
}
	} catch (error) {
		toast.error("Internal Server Error")
		seterror(true)
		setvalidurl(false)
		setloading(false)
	}
	
}

useEffect(()=>{
 
	fetchapi()

},[params])

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
			<>
	
		{
		validurl?
(<Emailvs/>):(<ReEmailvl/>)
	}
			
	
			</>
		)
}

export default EmailVerify