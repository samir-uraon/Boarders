import React from 'react'
import { useState ,useEffect} from 'react'
import { useNavigate ,NavLink} from 'react-router-dom'
import "./Messbill.css"



const Messbill = () => {

	const [isloading,setisloading]=useState(true)
const [bill,setbill]=useState([])
const navigate=useNavigate()

	let api=`${import.meta.env.VITE_Messbill}`

const apifetch=async ()=>{
		try {
			setisloading(true)
  let res=await fetch(api,{credentials:"include"})
		let data=await res.json()

		console.log(data);
		

if(data.verify){
		setisloading(false)
		setbill(data.verify)
	
	}
	else{
	//navigate("/Login")
	setisloading(false)
}


		} catch (error) {

			setisloading(false)
	//navigate("/Login")
		}
		
	}
useEffect(()=>{
	setTimeout(()=>{

		apifetch()
	},2000)

},[])



		if(isloading){
		return(
			<div className="center2 backwhite">
<div className="typewriter">
    <div className="slide"><i></i></div>
    <div className="paper"></div>
    <div className="keyboard"></div>
</div>
		</div>)
	}

		return (
<>
			<div className="gop bill">
								<button onClick={()=>{navigate(-1)}} id='pb'><i className="fa-solid fa-arrow-left"></i></button>
								<NavLink to="/MessConvenor" style={{color:"white"}}><button className="messcon"><i className="fa-solid fa-utensils" style={{marginRight:"0.3rem",fontSize:"1.4rem"}}></i>  Mess Convenor</button></NavLink>
															<NavLink to="/MessCommittee" style={{color:"white"}}><button className="messcom"><i class="fa-solid fa-users"  style={{marginRight:"0.3rem",fontSize:"1.4rem"}}></i>   Mess Committee</button></NavLink>

								</div>
								<div className="center-div">

								</div>
</>
		)
}

export default Messbill