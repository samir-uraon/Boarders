import React, { useEffect, useState } from 'react'
import AdminButtons from './AdminButtons'
import AdminSlideBar from './AdminSlideBar'
import "./Admin.css"
import { toast,ToastContainer } from 'react-toastify'
import Error from '../components/Error'
import { useNavigate } from 'react-router-dom'



const AdminFooter = () => {


	const [isdata, setisdata] = useState([]);
	const [isloading, setisloading] = useState(true);
	const [iserror, setiserror] = useState(false);
	
let navigate=useNavigate()

	const firstdo=async ()=>{
	let res=await fetch(`${import.meta.env.VITE_backendurl}footers`,{credentials:"include"})
	let resd=await res.json()
	//console.log(resd);

	setTimeout(() => {
		
		setisloading(false)
	}, 2500);

	if(res.status==200){
	setisdata(resd.data)
	}
		if(res.status==400){
	setisdata([])
navigate("/admin")
	}
	else{
					setisdata([])
					setiserror(true)
	}
	}

	const updatedata=(e)=>{
let a=e.target.parentElement
let b=prompt("Add New Link (If you do not add any link or remove added link ,then Type '#' , then Enter 'ok' and then Click 'save') ")
if(b){
a.children[2].id="show"
	isdata[a.id]=b
}

	}

const saveit=async(a)=>{




	let data={target:a,setit:isdata[a]}
	let res=await fetch(`${import.meta.env.VITE_backendurl}footers/addlinks`,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(data),credentials:"include"})
 

	setisloading(false)

if(res.status==200){
	toast.success("Link Add Successful...",{className:"test"})
}
else if(res.status==400){
navigate("/admin")
}
else if(res.status==500){
	toast.warn("Internal Server Error...",{className:"test"})
}
else{
		toast.error("Link Add failed...",{className:"test"})
}

}

	const savebutton=(d)=>{
	setisloading(true)
saveit(d.target.parentElement.id)
d.target.id="hide"

	}


	useEffect(() => {
					
	firstdo()
	
	}, []);

	if(isloading){
		return(
			<div className="center2 adl">
<div className="loader"></div> 
		</div>)
	}

if(iserror){
	return(
		<>
		<Error/>
		</>
	)
}

		return (
				<>
				<AdminButtons/>
				<AdminSlideBar/>
				<div className="center3">
					<div className="headpart">
					<h1>Footer Section</h1>
					</div>
					
					<div className="mainpart">
					
					<ul>

<li><div className="sections">
	<p>About Us</p>
<span> 
	<ul id='hostellink'>
<li onClick={()=>{
																					isdata.hostellink.charAt(isdata.hostellink.length-1)=="#"?toast.info('Link Not Given',{className:"test"}):window.open(isdata.hostellink)
																		}}>Visit Our Hostel</li>
	<button onClick={(e)=>{
		updatedata(e)
	}}> Add
	</button><button id='hide' onClick={(e)=>{
		savebutton(e)
	}}>Save</button></ul>
</span>
	</div>

	</li>
<li><div className="sections">
	<p>Follow Us</p>
<span> 
<ul className='sociallink'>

	<li>

		<ul  id="facebooklink">
<li onClick={()=>{
                    isdata.facebooklink.charAt(isdata.facebooklink.length-1)=="#"?toast.info('Link Not Added',{className:"test"}):window.open(isdata.facebooklink)
                 }}> <i className="fab fa-facebook"></i></li>
	<button onClick={(e)=>{
		updatedata(e)
	}}> Add
	</button><button id='hide' onClick={(e)=>{
		savebutton(e)
	}}>Save</button>
</ul>

	</li>
	<li>

 		<ul  id="youtubelink">			<li onClick={()=>{
																					isdata.youtubelink.charAt(isdata.youtubelink.length-1)=="#"?toast.info('Link Not Provided',{className:"test"}):window.open(isdata.youtubelink)
																		}}><i className="fa-brands fa-youtube"></i></li>
																	
	<button onClick={(e)=>{
		updatedata(e)
	}}> Add
	</button><button id='hide' onClick={(e)=>{
		savebutton(e)
	}}>Save</button>
</ul>
	</li>
	<li>
		<ul id="instralink">
		<li onClick={()=>{
																					isdata.instralink.charAt(isdata.instralink.length-1)=="#"?toast.info('Link Not Provided',{className:"test"}):window.open(isdata.instralink)
																		}}><i className="fab fa-instagram"></i></li>
																	
	<button onClick={(e)=>{
		updatedata(e)
	}}> Add
	</button><button id='hide' onClick={(e)=>{
		savebutton(e)
	}}>Save</button></ul>

	</li>

	<li>
		<ul id="linkedinlink">
	<li onClick={()=>{
																					isdata.linkedinlink.charAt(isdata.linkedinlink.length-1)=="#"?toast.info('Link Not Provided',{className:"test"}):window.open(isdata.linkedinlink)
																		}}><i className="fab fa-linkedin"></i></li>
	<button onClick={(e)=>{
		updatedata(e)
	}}> Add
	</button><button id='hide' onClick={(e)=>{
		savebutton(e)
	}}>Save</button></ul>


	</li>
</ul>
</span>
	</div>
	</li>
<li><div className="sections">
	<p>Contact Us</p>
<span> 
	<ul id='email'>
<li onClick={()=>{
																					isdata.adminemail.charAt(isdata.adminemail.length-1)=="#"?toast.info('Link Not Provided',{className:"test"}):window.open(`mailto:${isdata.adminemail}`)
																		}}>Email</li>
	<button onClick={(e)=>{
updatedata(e)

	}}> Add
	</button><button id='hide' onClick={(e)=>{
		savebutton(e)
	}}>Save</button></ul>
</span>
	</div>
	</li>

					</ul>
					
					</div>
</div>
<ToastContainer/>
				</>
		)
}

export default AdminFooter