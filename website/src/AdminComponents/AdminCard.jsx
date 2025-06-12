import React from 'react'
	
import "../components/CardMain.css"
import {  toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';



const AdminCard = ({data,links}) => {


	const verifyfunc=async(id)=>{
//console.log(`${import.meta.env.VITE_vlink}${id.toString()}/anything/focus`);

		let res=await fetch(`${import.meta.env.VITE_vlink}${id.toString()}/anything/focus`,{credentials:"include"})
let resd=await res.json()
//console.log(resd);

		if(res.status==200){
	window.location.reload()
}else{
	toast.error("Internal Server Error...",{className:"test"})
}
	}


const nverifyfunc=async(id)=>{
//console.log(`${import.meta.env.VITE_vlink}${id.toString()}/anything/focus`);

		let res=await fetch(`${import.meta.env.VITE_nvlink}${id.toString()}/anything/focus`,{credentials:"include"})
let resd=await res.json()
//console.log(resd);

		if(res.status==200){
	window.location.reload()
}else{
	toast.error("Internal Server Error...",{className:"test"})
}
	}


const delfunc=async(id)=>{
//console.log(`${import.meta.env.VITE_vlink}${id.toString()}/anything/focus`);

		let res=await fetch(`${import.meta.env.VITE_dlink}${id.toString()}/anything/focus`,{credentials:"include"})
let resd=await res.json()
//console.log(resd);

		if(res.status==200){
	window.location.reload()
}else{
	toast.error("Internal Server Error...",{className:"test"})
}
	}
	

		return (
			<>
	
				<div className="search_data adc">
												<div className="image_div">
														
													<img src={data.profile} alt="error" loading='lazy'/>
											</div>
												<div className="details">
													<p><span >Id : </span>{data._id}</p>
													<p><span >Name : </span>{data.name}</p>
             <p ><span >Email : </span><a href={`mailto:${data.email}`} id='sem'>{data.email}</a></p>
													<p><span >Department : </span>{data.dept}</p>
													<p><span >Passing Year : </span>{data.passingyear}</p>
													<p><span >University : </span>Jadavpur University</p>
													<p><span >HostelRoomNo : </span>{data.roomno}</p>
													<p><span >Home : </span>{data.home}</p>
													<p><span >Email Verify : </span>{(data.emailverification)?"Verified":"Not Verified"}</p>
													<p><span >Profile Verify : </span>{(data.profileverification)?"Verified":"Not Verified"}</p>
													<p><span >time : </span>{data.time}</p>
													<p><span >lastupdate : </span>{data.lastupdate}</p>
													<p><span >Home : </span>{data.home}</p>

												</div>
											<div className="butcontainer adfb">
												
		<a><i className="fa-brands fa-facebook" style={{color:"rgb(12, 96, 223)"}}   onClick={(e)=>{ 
				
			
				links[0].charAt(links[0].length-1)=="#"?toast.info('Link Not Provided',{className:"test"}):window.open(links[0])

			
}}></i></a>


		<a><i className="fa-brands fa-instagram" style={{color:"rgb(177, 67, 118)"}} onClick={(e)=>{
			
links[1].charAt(links[1].length-1)=="#"?toast.info('Link Not Provided',{className:"test"}
):window.open(links[1])
}
}></i></a>
		<a>
						<i className="fa-brands fa-linkedin" style={{color:"blue"}}  onClick={(e)=>{
			
				links[2].charAt(links[2].length-1)=="#"?toast.info('Link Not Provided',{className:"test"}):window.open(links[2])
		}
				
				}></i></a>
		<a >
						<i className="fa-brands fa-whatsapp" style={{color:"rgb(12, 185, 53)"}} onClick={(e)=>{
				
			
links[3].charAt(links[3].length-1)=="#"?toast.info('Link Not Provided',{className:"test"}):window.open(`https:/wa.me/${links[3]}`)
		
				}}>
		
		</i>
		</a>
		</div>
		<div className="exbtns">
			<button  style={{gridArea:"c"}} onClick={()=>{
						let aok=confirm("Profile Verified.....")
		if(aok){verifyfunc(data._id)}}}><i className="fa-solid fa-user-check"></i> Verify</button>
	<button style={{gridArea:"b"}} onClick={()=>{
				let aok=confirm("Profile Not Verified....")
		if(aok){nverifyfunc(data._id)}}}>			<i className="fa-solid fa-user-xmark"></i> Not Verify</button>
	<button style={{gridArea:"a"}} onClick={()=>{
		let aok=confirm("Are you Delete this user ?")
		if(aok){
			delfunc(data._id)
		}
		}}><i className="fa-solid fa-trash"></i> Delete</button>

		 
		</div>
		</div>

		<ToastContainer

/>
		</>
		)
}

export default AdminCard