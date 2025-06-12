import React, { useEffect ,useState} from 'react'
import "./signup.css"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { NavLink } from 'react-router-dom'
import {year,room,dept,Address} from './Optionsarr'
import { toast ,ToastContainer} from 'react-toastify'

const Signup = () => {

	const [isloading,setisloading]=useState(false)
	const [coordinates,setcoordinates]=useState("")

	

const FormValidation=(data)=>{
	let bool=false

let file=document.querySelector(".input-div3 input").files[0]


	let indexr=data[1].value.indexOf("@")

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

	if(["@gmail.com","@outlook.com","@yahoo.com","@jadavpuruniversity.in"].includes(data[1].value.slice(indexr,data[1].value.length)) && data[1].value.slice(0,indexr).length>=5){


		if(data[6].value.length>=8){

	if (dept.includes(data[2].value)) {
//console.log(year);

		if (year.includes(Number(data[3].value))) {
			if (data[4].value.length>=5) {
				
			
			if (room.includes(data[5].value)) {
		
		if(Math.ceil(file.size/1000)<200){

	bool=true
				return{go:bool,index:null}
			}else{
				bool=false
				return{go:bool,index:6}
			}

			} else {
				bool=false
				return {go:bool,index:5}
			}
		}else {
				bool=false
								return{go:bool,index:4}
							}
		} else {
			bool=false
			return {go:bool,index:3}
		}
	}else{
		bool=false
		return {go:bool,index:2}
	}
		}else{
			bool=false
			return {go:bool,index:6}
		}

}else{
		bool=false
		return {go:bool,index:1}
	}
}

const nowpost=async ()=>{
		
	let data=new FormData(document.querySelector("#form"))


	let url=new URL(import.meta.env.VITE_email)
 url.searchParams.append("Email",data.get("Email"))
//console.log(url.search);

let rese=await fetch(url.href)
let resed=await rese.json()
//console.log(resed.Emailexist);

if(!resed.Emailexist){
	setisloading(true)
	let data2=new FormData()
	data2.append("file",document.querySelector(".input-div3 input").files[0])
	data2.append("upload_preset",import.meta.env.VITE_upload_preset)
	data2.append("cloud_name",import.meta.env.VITE_cloud_name)


let res2=	await fetch(import.meta.env.VITE_cloud_api,{method:"post",body:data2})
	let res21=await res2.json()
	//console.log(res21.url);
data.set("Profile",res21.url)
data.append("coords",coordinates)
//console.log(data);


let res=await fetch(import.meta.env.VITE_create,{method:"post",body:data})
let resdata=await res.json()


//console.log(resdata.status);

if(resdata.status){
	//document.querySelector(".input-div3 input").style.color="white"
	document.querySelectorAll("form input").forEach((w)=>{
		w.value=""
	})

setisloading(false)
toast.success("Check Your Email For Email Validation!")
 
}
else if(res.status==209 && !resdata.status){
	setisloading(false)
toast.warn("This Room No is Already Exist!")
}
else if(res.status==500){
	document.querySelectorAll("form input").forEach((w)=>{
		w.value=""
	})

setisloading(false)
toast.error("Internal Server Error!")

}

}
else{

	toast.warn("Email Already Exist")

}

}

const locationpick=()=>{
if(navigator.geolocation && !coordinates && !localStorage.getItem("coords")){
	navigator.geolocation.getCurrentPosition((position)=>{
	const {latitude,longitude}=position.coords
	setcoordinates(`${latitude} ${longitude}`)
	localStorage.setItem("coords","ok")
	},
(error)=>{
	localStorage.setItem("coords","ok")
	setcoordinates("userBlockIt")
	//console.error(error);
},{
	enableHighAccuracy:true
}
)}
}




const handel=(event)=>{

event.preventDefault()
let a=document.querySelectorAll(".input-div2 input")

if(FormValidation(a).go){
	//console.log("done");
 nowpost()
}
else if(FormValidation(a).index==6){

	document.querySelector(".input-div3 p").style.display="block"
}

else{

	document.querySelectorAll(".input-div2")[FormValidation(a).index].querySelector("p").style.display="block"
}

}

const clearp=(a)=>{
a.style.display="none"
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

useEffect(()=>{

	createOptions()
locationpick()

},[])

useGSAP(()=>{
gsap.from(".cards",{duration:2,opacity:0,ease:"back",scale:0.3})
})
 
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
					<div className="goback">
						<NavLink to="/"><button><i className="fa-solid fa-house"></i></button></NavLink>
					</div>
					<div className="containerss">
<div className="cards">


<h2>Create Profile</h2>
<form method='post'  
onSubmit={(event)=>{handel(event)}}
id='form'
encType='multipart/form-data'
>
	<div className="form-div">


				<div className="input-div2">
				<input type="text" id='name' name='Name' required autoComplete='off' onChange={(e)=>{
		
			clearp(e.target.parentElement.querySelector("p"))
		}}/>
				<label htmlFor="name">Full Name</label>
				<i className='bx bxs-user' onClick={(e)=>{
e.target.parentElement.querySelector("input").focus()
}}></i>
				<p>Real Name</p>
</div>

<div className="input-div2">
				<input type="text" id='em' name='Email' required autoComplete='off' onChange={(e)=>{

	clearp(e.target.parentElement.querySelector("p"))

}}/>
				<label htmlFor="em">Email</label>
				<i className='bx bxs-envelope' onClick={(e)=>{
e.target.parentElement.querySelector("input").focus()
}}></i>
	<p>Invalid Email</p>
</div>

<div className="input-div2">
				<input type="text" id='dep' name='Department' required autoComplete='off' list='depts' onClick={()=>{createOptions()}}  onChange={(e)=>{
	clearp(e.target.parentElement.querySelector("p"))
}}/>
<datalist id='depts'>

</datalist>
				<label htmlFor="dep">Department</label>
				<i className='fa-solid fa-bookmark' onClick={(e)=>{
e.target.parentElement.querySelector("input").focus()
}}></i>
	<p>Invalid Department</p>
</div>

<div className="input-div2">
				<input type="text" id='year' name='Year' required autoComplete='off' list='years' onClick={()=>{createOptions()}}
				 onChange={(e)=>{
	clearp(e.target.parentElement.querySelector("p"))
}}/>
<datalist id='years'>


</datalist>
				<label htmlFor="year">Passing Year</label>
				<i className='fa-solid fa-calendar-days' onClick={(e)=>{
e.target.parentElement.querySelector("input").focus()
}}></i>
	<p>Invalid Year</p>
</div>

<div className="input-div2">
				<input type="text" id='home' list='addresslist' name='Home' required autoComplete='off' onClick={()=>{createOptions()}} onChange={(e)=>{
	clearp(e.target.parentElement.querySelector("p"))
}}/><datalist id='addresslist'>


</datalist>
				<label htmlFor="home">Home</label>
				<i className='fa-solid fa-location-dot' onClick={(e)=>{
e.target.parentElement.querySelector("input").focus()
}}></i>
	<p>Address Please!</p>
</div>
<div className="input-div2">
				<input type="text" id='hst' name='Room' required autoComplete='off' list='rooms' onClick={()=>{createOptions()}
				} onChange={(e)=>{
	clearp(e.target.parentElement.querySelector("p"))
}}/>
<datalist id='rooms'>

</datalist>
				<label htmlFor="hst">Hostel RoomNo.</label>
				<i className='bx bxs-key' onClick={(e)=>{
e.target.parentElement.querySelector("input").focus()
}}></i>
<p>Invalid RoomNo.</p>
</div>
<div className="input-div2">
				<input type="password" id='name' name='Password' required autoComplete='off' onChange={(e)=>{
		
			clearp(e.target.parentElement.querySelector("p"))
	
		}}
		
		/>
				<label htmlFor="name">password</label>
				<i className='bx bxs-lock' onClick={(e)=>{
e.target.parentElement.querySelector("input").focus()
}}></i>
				<p>Minimum 8 letters</p>
</div>
<div className="input-div3">
				<input type="file" name='Profile' required accept='.png,.jpg,.jpeg'  onChange={(e)=>{e.target.style.color="aqua"
e.target.parentElement.querySelector("p").style.display="none"

		}}/>
				<p>Maximum 200KB</p>
</div>


</div>

		
		<div className="input-button2">
		<button type="submit">Submit</button></div>


		<div className="text2">
	<p>Do you have a Profile? <NavLink to="/Login">Login</NavLink></p></div>




</form>
</div>

	</div>

	<ToastContainer/>
					
					</>
		)
}

export default Signup