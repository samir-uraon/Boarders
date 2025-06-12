import React from 'react'
import "./Head.css"
import Cards from './Cards'
import { useState ,useRef,useEffect} from 'react'
import {NavLink} from "react-router-dom"
import { useAuth } from './Auth'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Head = () => {

const [data,setdata]=useState("")
const [filterdata,setfilterdata]=useState("Name")
const {isOk}=useAuth()

const optionchange=useRef()

useGSAP(()=>{
	let timelinepower=gsap.timeline()
timelinepower.from(".testh1",{opacity:0,duration:1,ease:"power1",y:-50,delay:1.5})
.from(".filterby",{opacity:0,duration:1,ease:"power1",y:50})
.from(".inputarea",{opacity:0,duration:1,ease:"power1",y:-250,rotate:360}).to("#fsearch",{opacity:1})
})

useEffect(()=>{

	if(isOk){

	optionchange.current.innerHTML=` <option value="Name">Name</option>
	<option value="dept">Department</option>
	<option value="Email">Email</option>
	<option value="passingyear">Passing Year</option>
	<option value="roomno">Room No.</option>
			<option value="home">Home</option>`
	}

},[])

		return (
		 <>
			<div className="center">
<div className="headdiv">
			<h1 className='testh1'>JUSL Boy's Hostel Boarders</h1>
			<div className="input-section">
				<div className="input">
				<input type="text" placeholder='Search Here' className='inputarea' 
				onChange={(e)=>{
				setdata(e.target.value)
		
				}}/>
				<i className='fa-solid fa-search' id='fsearch' onClick={()=>{
					document.querySelector(".inputarea").focus()
				}}></i></div>
				<div className="filterby" id='fid'>
					<p>Filter By : </p>
				<select name="filter" ref={optionchange} id="filter"  onChange={(e)=>{
setfilterdata(e.target.value)
				}}>
  <option value="Name">Name</option>
		<option value="Dept">Department</option>
</select>
</div>
			</div>
			</div>
<Cards sinput={data} filter={filterdata}/>
</div>
			</>
		)
}

export default Head