import React from 'react'
import { useState,useEffect } from 'react'
import { toast,ToastContainer } from 'react-toastify';
import {useNavigate,NavLink} from "react-router-dom"
import "./AddLinks.css"

const AddLinks = () => {

	let navigate=useNavigate()

	const [isloading, setisloading] = useState(true);
		const [isupdate, setisupdate] = useState(true);
	const [addlinks, setaddlinks] = useState({});
const [isError, setisError] = useState(false);
let url=`${import.meta.env.VITE_backendurl}${import.meta.env.VITE_Ad}`

const firstwork=async ()=>{
	
let res=await fetch(url,{credentials:"include"})
let resd=await res.json()



if(resd.data){

setaddlinks(resd.data)
setisloading(false)
}else if(res.status==404){
navigate("/Login")
}
else{
setisloading(false)
setisError(true)
}
}


const sendit=async (data) => {
		let res=await fetch(url,{method:"post",body:data,credentials:"include"})
  let resd=await res.json()
setisupdate(true)

		if(resd["add_link"]){
			setisloading(false)
			toast.success("Complete....")
		}
		else if(res.status==404){
			setisloading(false)
			setisError(true)
		}
		else{
setisloading(false)
toast.error("Internal Server Error")
	
		}
}

function handelit(e){
e.preventDefault()
	let formdata=document.querySelector(".form2")

	
let num=formdata[3].value



if(isupdate){
	return 
}
 else if(num!=""){
if(num.length!=10 && num.length!=13){

return toast.warn("Whatsapp Number Not Valid")
}
}
else if(!num.startsWith("+91") && num!=""){
let newnum=`+91${num}`
updateadd("wl",newnum)
formdata[3].value=newnum
}

document.querySelectorAll("input").forEach((items)=>{
		items.value==""?	items.value="#":null
	})


	let transferdata=new FormData(formdata)
setisloading(true)
 sendit(transferdata)

}

function updateadd(a,b){
	if(b==""){
		b="#"

	}
	setisupdate(false)
	addlinks[a]=b

}

useEffect(() => {
	setTimeout(()=>{

		firstwork()
	},1000)

}, []);


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
	
	if(isError){
			return (
			<Error/>
			)
			}
	
			return (
				<>

					<div className="gop adcolor2">
					<div className='sbuts'>
								<button onClick={()=>{navigate(-1)}} id='pb'><i className="fa-solid fa-arrow-left"></i></button>
<button onClick={()=>{navigate("/Profile")}} id='pb3'><i className="fa-solid fa-id-card"></i> Profile</button>
</div>	
														<div id='butsdiv'>	<NavLink to="/Edit_Profile" style={{color:"white"}}><button id="buts"><i className="fa-solid fa-pen-to-square" style={{marginRight:"0.1rem" ,fontSize:"1.5rem"}}></i>  Edit Profile</button></NavLink>
													<NavLink to="/Change_Password" style={{color:"white"}}><button id="buts"><i className="fa-solid fa-key"></i>  Change Password</button></NavLink>
							</div>
								
								</div>
<div className="ad">
<h2>Add Links</h2>

		<form className='form2' onSubmit={(event)=>{handelit(event)}}>

<div className="input_div">
			{/*<label htmlFor="l1">Facebook Account :</label>*/}
				<input type="url" id='l1' name='tfl' defaultValue={addlinks.fl=="#"?"":addlinks.fl} placeholder='Enter URL' title='Blank For Not Add Link' autoComplete='off' onChange={(e)=>{updateadd("fl",e.target.value)}}/>
				<a onClick={()=>{
																						addlinks.fl=="#"?toast.info('Link Not Add',{className:"test"}):window.open(addlinks.fl)}}
																						 target='_blank'><i className="fab fa-facebook"></i></a>
					
						</div>
<div className="input_div">
							{/*<label htmlFor="l2">Instragram Account :</label>*/}
				<input type="url" id='l2' name='til' defaultValue={addlinks.il=="#"?"":addlinks.il} placeholder='Enter URL' title='Blank For Not Add Link' autoComplete='off' onChange={(e)=>{updateadd("il",e.target.value)}}/>
						<a onClick={()=>{
																						addlinks.il=="#"?toast.info('Link Not Add',{className:"test"}):window.open(addlinks.il)}}
																						 target='_blank'><i className="fab fa-instagram"></i></a>
</div>

<div className="input_div">
					{/*<label htmlFor="l1">Linkedin Account :</label>*/}
				<input type="url" id='l3' name='tll' defaultValue={addlinks.ll=="#"?"":addlinks.ll} placeholder='Enter URL' title='Blank For Not Add Link'   autoComplete='off'  onChange={(e)=>{updateadd("ll",e.target.value)}}/>
					<a  onClick={()=>{
																						addlinks.ll=="#"?toast.info('Link Not Add',{className:"test"}):window.open(addlinks.ll)}}
																						 target='_blank'><i className="fab fa-linkedin"></i></a>
						</div>

		<div className="input_div">
			{/*<label htmlFor="l4">Whatsapp Number :</label>*/}
								<input type="text" id='l4' name='twl' defaultValue={addlinks.wl=="#"?"":addlinks.wl} placeholder='Enter URL' title='Blank For Not Add Link'   autoComplete='off'  onChange={(e)=>{updateadd("wl",e.target.value)}}/>
<a  onClick={()=>{
																						addlinks.wl=="#"?toast.info('Link Not Add',{className:"test"}):window.open(`https:wa.me/${addlinks.wl}`)}}
																						 target='_blank'><i className="fa-brands fa-whatsapp"></i></a>
		
					</div>
			
					
		<div className={(!isupdate)?"input-button2":"hide"}>
		<button type="submit" onClick={()=>{setisupdate(false)}}>Add Links</button></div>
			 


		</form>


	            

		</div>
		<ToastContainer/>
		</>
		)


	
	
	}

export default AddLinks