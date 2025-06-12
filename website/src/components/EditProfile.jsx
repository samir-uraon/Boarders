import React from 'react'
import "./EditProfile.css"
import { useState,useEffect } from 'react'
import { toast,ToastContainer } from 'react-toastify';
import {useNavigate,NavLink} from "react-router-dom"
import {year,room,dept,Address} from './Optionsarr'
import { GiHouseKeys } from "react-icons/gi";


const EditProfile = () => {

	let navigate=useNavigate()

	const [isloading, setisloading] = useState(true);
		const [isupdate, setisupdate] = useState(false);
	const [pdata, setpdata] = useState([]);
const [isError, setisError] = useState(false);
let url=`${import.meta.env.VITE_EditProfile}`

const firstwork=async ()=>{
	
let res=await fetch(url,{credentials:"include"})
let resd=await res.json()

if(resd.data){
 

setpdata(resd.data)
setisloading(false)
}else if(res.status==404){
	navigate("/Login")
}
else{
setisloading(false)
setisError(true)
}
}


const FormValidation=(data)=>{
	let bool=false

let file=document.querySelector(".ph input").files[0]





	if(data[0].value.length<=5){
		bool=false
return {go:bool,index:0}
	}

for (let index1 = 0; index1 < data[0].value.length; index1++){
	if(["1","2","3","4","5","6","7","8","9","0"].includes(data[0].value.charAt(index1))){
		bool=false
return {go:bool,index:0}
	}
}

	if (dept.includes(data[1].value)) {

		if (year.includes(Number(data[2].value))) {

			if (data[3].value.length>=5) {
				
			
			if (room.includes(data[4].value)) {
		
		if(!file || Math.ceil(file.size/1000)<200){

	bool=true
				return{go:bool,index:null}
			}else{
				bool=false
				return{go:bool,index:5}
			}

			} else {
				bool=false
				return {go:bool,index:4}
			}
		}else {
				bool=false
								return{go:bool,index:3}
							}
		} else {
			bool=false
			return {go:bool,index:2}
		}
	}else{
		bool=false
		return {go:bool,index:1}
	}
		
}


const nowpost=async () => {
	
	try {
		
		setisloading(true)

		let fdata=document.querySelector(".ec2 form")
			//console.log(fdata);
		
		let tdata=new FormData(fdata)

		//console.log(tdata);


		if(document.querySelector(".ph input").files[0]){


		let data2=new FormData()
	data2.append("file",document.querySelector(".ph input").files[0])
	data2.append("upload_preset",import.meta.env.VITE_upload_preset)
	data2.append("cloud_name",import.meta.env.VITE_cloud_name)


let res2=	await fetch(import.meta.env.VITE_cloud_api,{method:"post",body:data2})
	let res21=await res2.json()

tdata.set("Profile",res21.url)

		}else{
			
			tdata.set("Profile",pdata.profile)
		}


		
		let res=await fetch(url,{method:"post",body:tdata,credentials:"include"})
		let resd=await res.json()
		setisloading(false)

		if(resd.add_profile){
			toast.success("Successfully Update your Profile",{className:"test"})
		}

		else{
			toast.error("Profile Not Update",{className:"test"})
		}
setisupdate(false)
	} catch (error) {
		console.log(error.message);
		setisupdate(false)
		setisloading(false)
		toast.error("Internal Server,Try Later...",{className:"test"})
	}


}


const handel=(event)=>{

event.preventDefault()
 
let a=document.querySelectorAll(".input-div2 input")
if(FormValidation(a).go){
	//console.log("done");
 nowpost()
}
else if(!FormValidation(a).go && FormValidation(a).index==5){

	toast.error("Profile pic Maximum 200KB",{className:"test"})
}
else if(!FormValidation(a).go && FormValidation(a).index==0){

	toast.error("Please Enter Your Real Name",{className:"test"})
}

else if(!FormValidation(a).go && FormValidation(a).index==1){

	toast.error("Please, Select A Department",{className:"test"})
}

else if(!FormValidation(a).go && FormValidation(a).index==2){

	toast.error("Select a Passing Year",{className:"test"})
}

else if(!FormValidation(a).go && FormValidation(a).index==4){

	toast.error("This Room No is Not Available",{className:"test"})
}

else if(!FormValidation(a).go && FormValidation(a).index==3){

	toast.error("Enter or Select your Address",{className:"test"})
}


}


 

const createOptions=()=>{
	let y=document.querySelector("#years")
	let d=document.querySelector("#depts")
	let r=document.querySelector("#rooms")
	let a=document.querySelector("#addresslist")

	y.innerHTML=year.map((e)=>{ 
		return (`<option value=${e}>${e}</option>`)
	}).join("")

	r.innerHTML=room.map((e)=>{ 
		return (`<option value=${e}>${e}</option>`)
	}).join("")


	d.innerHTML=dept.map((e)=>{ 

		return (`<option value="${e}">${e}</option>`)
	}).join("")


	a.innerHTML=Address.map((e)=>{ 
		
		return (`<option value="${e}">${e}</option>`)
	}).join("")


}

const pupdate=()=>{
	setisupdate(true)
	let iurl=URL.createObjectURL(document.querySelector(".ph input").files[0])
	document.querySelector(".pphoto").src=iurl
setpdata({...pdata,profile:iurl})
}

function updateadd(a,b){

setisupdate(true)

	pdata[a]=b
	
}


useEffect(()=>{

	setTimeout(() => {
		
		firstwork()
	}, 2000);

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
					<div className='main-screen'>
	<div className="gop adcolor">
								<div className='sbuts'>
								<button onClick={()=>{navigate(-1)}} id='pb'><i className="fa-solid fa-arrow-left"></i></button>
<button onClick={()=>{navigate("/Profile")}} id='pb3'><i className="fa-solid fa-id-card"></i> Profile</button>
</div>	
									<div id='butsdiv'>	
										<NavLink to="/Change_Password" style={{color:"white"}}><button id="buts"><i className="fa-solid fa-key"></i>  Change Password</button></NavLink>
																<NavLink to="/Add_Links" style={{color:"white"}}><button id="buts"><i className="fa-solid fa-link"></i>  Add Links</button></NavLink>
										</div>
										
								</div>

					<div className="containerss ad2">
						
						<div className="pphotodiv">
<img className="pphoto" src={pdata.profile}/>
<label htmlFor='ef'> <i className="fa-solid fa-arrow-up-from-bracket" style={{marginRight:"0.4rem"}}></i> Upload</label>
						</div>

<div className="cards ec2">
<form method='post'  
onSubmit={(event)=>{handel(event)}}
id='form'
encType='multipart/form-data'
>
	<h2>Edit Profile</h2>
	<div className="form-div">


				<div className="input-div2">
				<input type="text" id='name' name='Name' defaultValue={pdata.name} required autoComplete='off' onChange={(e)=>{
updateadd(e.target.id,e.target.value)
		}}/>
				<label htmlFor="name">Full Name</label>
				<i className='fa-solid fa-user-tie' onClick={(e)=>{
e.target.parentElement.querySelector("input").focus()
}}></i>
</div>



<div className="input-div2">
				<input type="text" id='dep' name='Department'  defaultValue={pdata.dept} required autoComplete='off' list='depts' onClick={()=>{createOptions()}} onChange={(e)=>{updateadd(e.target.id,e.target.value)
}}/>
<datalist id='depts'>

</datalist>
				<label htmlFor="dep">Department</label>
				<i className='fa-solid fa-bookmark' onClick={(e)=>{
e.target.parentElement.querySelector("input").focus()
}}></i>
</div>

<div className="input-div2">
				<input type="text" id='year' name='Year' defaultValue={pdata.passingyear} required autoComplete='off' list='years' onClick={()=>{createOptions()}}
				 onChange={(e)=>{updateadd(e.target.id,e.target.value)
}}/>
<datalist id='years'>


</datalist>
				<label htmlFor="year">Passing Year</label>
				<i className='fa-solid fa-calendar-days' onClick={(e)=>{
e.target.parentElement.querySelector("input").focus()
}}></i>
</div>

<div className="input-div2">
				<input type="text" id='home' list='addresslist' defaultValue={pdata.home} name='Home' required autoComplete='off' onClick={()=>{createOptions()}} onChange={(e)=>{ updateadd(e.target.id,e.target.value)
}}/><datalist id='addresslist'>


</datalist>
				<label htmlFor="home">Home</label>
				<i className='fa-solid fa-location-dot' onClick={(e)=>{
e.target.parentElement.querySelector("input").focus()
}}></i>
</div>
<div className="input-div2">
				<input type="text" id='hst' name='Room' required defaultValue={pdata.roomno} autoComplete='off' list='rooms' onClick={()=>{createOptions()}
				} onChange={(e)=>{updateadd(e.target.id,e.target.value)
}}/>
<datalist id='rooms'>

</datalist>
				<label htmlFor="hst">Hostel RoomNo.</label>
				<GiHouseKeys id='i' onClick={(e)=>{
e.target.parentElement.querySelector("input").focus()
}}/>
</div>




</div>

		
		<div className={(isupdate)?"input-button2":"hide"}>
		<button type="submit" onClick={()=>{setisupdate(false)}}>Update This</button></div>






</form>
<div className="ph">
				<input type="file" id='ef'  name='Profile' required accept='.png,.jpg,.jpeg'  onChange={()=>{
pupdate()

		}}/>
</div>
</div>

	</div>

	<ToastContainer/>
					</div>
					</>
		)
	}



export default EditProfile