import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast,ToastContainer } from 'react-toastify'
import Error from '../components/Error'
import "./Admin.css"
import { useParams ,NavLink, useNavigate} from 'react-router-dom'

const Accept = () => {
	let navigate=useNavigate()

	let params=useParams()
const [isloding, setisloding] = useState(true);
const [iserror, setiserror] = useState(false);
const [isExpire, setisExpire] = useState(false);
const [isprof, setisprof] = useState("");

const startfirst=async ()=>{
	
let url=`${import.meta.env.VITE_backendurl}user/${params.id}/access/${params.token}`
 
//console.log(url);

	let res=await fetch(url,{credentials:'include'})
	let resd=await res.json()
 
	
	//console.log(resd);
	
setisloding(false)

	if(res.status==200){
		toast.success(resd.message,{className:"test"})
setTimeout(() => {
						toast.success("Password send in your Email",{className:"test"})

}, 1000);
setisprof(resd.prof)
	}
	else if(res.status==201){
setisExpire(true)
	}
		else if(resd.message=="Invalid Link"){
setisExpire(false)
setisExpire(true)
	}
else{
	setiserror(true)
}


}


	useEffect(()=>{
	
	startfirst()
	
	},[])


if(isloding){
	return (
			<div className="center2 adl">
<div className="loader"></div> 
		</div>
	)
}
else if(iserror){
	return(
<Error/>
	)
}
else if(isExpire){
	return (
			<div className="center2">
									<img src="https://static.vecteezy.com/system/resources/previews/017/178/222/original/round-cross-mark-symbol-with-transparent-background-free-png.png"
								 alt="" />
									<h2>Link Expired</h2>
									<button onClick={()=>{navigate("/admin/newadmin")}} style={{backgroundColor:"black"}}>Resend</button>
								</div>
	)
}



		return (
	<>
		<div className="center2 aac">
				<img src={isprof} alt="" onError={(e)=>{e.target.src="https://thumbs.dreamstime.com/b/salesman-icon-189410337.jpg"}}/>
		  <h2>Admin Access Confirmed</h2>
				<NavLink to="https://mail.google.com/"><button style={{backgroundColor:"black"}}>Open Gmail</button></NavLink>
			</div>
			<ToastContainer/>
	</>
		)
}

export default Accept