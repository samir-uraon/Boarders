import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast,ToastContainer } from 'react-toastify'
import { useNavigate ,NavLink} from 'react-router-dom'
import "./Profile.css"
import { useAuth } from './Auth'

const Profile = () => {
 


let navigate=useNavigate()
	const [isloading,setisloading]=useState(true)
const [prof,setprof]=useState([])
const {setisOk,setcarddata}=useAuth()


	let api=`${import.meta.env.VITE_Profile}`


	const apifetch=async ()=>{
		try {
			setisloading(true)
  let res=await fetch(api,{credentials:"include"})
		let data=await res.json()
  		

if(res.status==200){
		setisloading(false)
		setprof(data.verify)
	
	}
	else if(res.status==404){
	navigate("/Login")
}
	else{
	navigate("/Login")
	setisloading(false)
}


		} catch (error) {

			setisloading(false)
	navigate("/Login")
		}
		
	}



useEffect(()=>{

	setTimeout(()=>{
		apifetch()
	},2000)

},[])




	if(isloading){
		return(
			<div className="center2">
<div className="typewriter">
    <div className="slide"><i></i></div>
    <div className="paper"></div>
    <div className="keyboard"></div>
</div>
		</div>)
	}




		return (
			<>
						<div className="gop">
							<div className='sbuts'>
								<button onClick={()=>{navigate(-1)}} id='pb'><i className="fa-solid fa-arrow-left"></i></button>
<button onClick={()=>{navigate("/")}} id='pb2'><i className="fa-solid fa-house"></i> Home</button>
</div>
								{/*<NavLink to="/Messbill" style={{color:"white"}}>*/}
								<button className="mess" onClick={()=>{
					toast.info("This Section was not active",{className:"test"})
				}}><i className="fa-regular fa-credit-card"></i>  Mess Bill</button>
								{/*</NavLink>*/}

								</div>
<div className="center-div">
	<h2>Your Profile</h2>
<div className="main-div">

	<div className='pf'>
<img src={prof.profile} alt="error" />
<div className="pdetails">
<h2>{prof.name}</h2>
<p><i className="fa-solid fa-graduation-cap" style={{marginRight:"0.3rem" ,fontSize:"1.3rem"}}></i> {prof.dept}</p>
<p><i className="fa-solid fa-font-awesome" style={{marginRight:"0.55rem" ,fontSize:"1.3rem"}}></i> {prof.passingyear} Batch</p>
</div>
</div>

<div className='ps'>
<span>
<p>
{prof.home.split(", ")[0] || prof.home.split(",")[0] || prof.home.split(" ")[0] || prof.home}
</p>
<p>
Home
</p>
	</span>
<span>
<p>
{prof.roomno}
</p>
<p>
Room No.
</p>
	</span>
<span>
	<p>
{prof.lastupdate.split("T")[0]}
	</p>
	<p>
Last  Update
	</p>
</span>

</div>
<div className='pt'>
<section>
	                <ul className="social-icons">
                 <li><a onClick={()=>{
																						prof.facebooklink=="#"?toast.info('Link Not Add',{className:"test"}):window.open(prof.facebooklink)}}
																						 target='_blank'><i className="fab fa-facebook"></i></a></li>
                 <li><a onClick={()=>{
																						prof.facebooklink=="#"?toast.info('Link Not Add',{className:"test"}):window.open(prof.instralink)}}
																						 target='_blank'><i className="fab fa-instagram"></i></a></li>
                 <li><a  onClick={()=>{
																						prof.facebooklink=="#"?toast.info('Link Not Add',{className:"test"}):window.open(prof.linkedinlink)}}
																						 target='_blank'><i className="fab fa-linkedin"></i></a></li>
                 <li><a  onClick={()=>{
																						prof.facebooklink=="#"?toast.info('Link Not Add',{className:"test"}):window.open(`https://wa.me/${prof.whatsapplink}`)}}
																						 target='_blank'><i className="fa-brands fa-whatsapp"></i></a></li>
                </ul>
</section>
<NavLink to="/Add_Links" id="paddbutton"><section>Add Links</section></NavLink>
</div>

</div>
<div className="pbuttons">
	<NavLink to="/Edit_Profile"><button><i className="fa-solid fa-pen-to-square" style={{marginRight:"0.1rem" ,fontSize:"1.5rem"}}></i> Edit Profile</button></NavLink>
	<NavLink to="/Change_Password"><button><i className="fa-solid fa-key"></i> Change Password</button></NavLink>
	<button onClick={()=>{	
			let checkiit=confirm("Are you sure to leave here?")
		if(checkiit){ window.location.href="/Logout"  }}}><i className="fa-solid fa-power-off" style={{marginRight:"0.1rem" ,fontSize:"1.2rem"}}></i> Logout</button>
</div>
</div>

<ToastContainer/>
			</>
		)
}

export default Profile