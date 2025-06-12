import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState ,useRef,useEffect} from 'react'
import AdminCard from './AdminCard'
import AdminButtons from './AdminButtons'
import AdminSlideBar from './AdminSlideBar'



const Dashboard = ({details}) => {



const [sinput,setsinput]=useState("")
const [filterdata,setfilterdata]=useState("Name")
const [lastindex,setlastindex]=useState(3)
const optionchange=useRef()
let factor=3

useEffect(()=>{

	optionchange.current.innerHTML=`
	<option value="_id">Id</option>
	<option value="name" selected>Name</option>
	<option value="email">Email</option>
	<option value="dept">Department</option>
	<option value="passingyear">Passing Year</option>
	<option value="roomno">Room No.</option>
			<option value="home">Home</option>
			<option value="emailverification">Email Verification</option>
			<option value="profileverification">Profile Verification</option>

			`
	

},[])





	let searchInput=details.filter((cur)=>{
		if(filterdata.toLowerCase()=="emailverification" || filterdata.toLowerCase()=="profileverification"){
			if("verified".startsWith(sinput.toLowerCase()) && sinput!=""){
				return cur[filterdata.toLowerCase()]
			}
			else	if("not verified".startsWith(sinput.toLowerCase()) && sinput!=""){
				return !cur[filterdata.toLowerCase()]
			}
			else{
				return true
			}
		}
	return cur[filterdata.toLowerCase()].toLowerCase().startsWith(sinput.toLowerCase())
		})

		return (
<>

<AdminSlideBar/>

<div className="dashmain">

<AdminButtons/>
	<div className="center">
<div className="headdiv">
			<h1 className='testh1'>JUSL Boy's Hostel Admin Panel
</h1>
			<div className="input-section">
				<div className="input">
				<input type="text" placeholder='Search Here' className='inputarea' 
				onChange={(e)=>{
				setsinput(e.target.value)
		setlastindex(3)
				}}/>
				<i className='fa-solid fa-search' onClick={()=>{
					document.querySelector(".inputarea").focus()
				}}></i></div>
				<div className="filterby" id='fid'>
					<p>Filter By : </p>
				<select name="filter" ref={optionchange} id="filter"  onChange={(e)=>{
setfilterdata(e.target.value)
				}}>
</select>
</div>
			</div>
			</div>

<div className="containerCard adcc">
	{searchInput.slice(0,lastindex).map((card,index)=>{
		
   return <AdminCard key={index}  data={card} links={[card.facebooklink,card.instralink,card.linkedinlink,card.whatsapplink]}/>
	})}

	</div>
	<div className="buttonsad">

	<button className={(lastindex>=searchInput.length)?"hide":""}  id='ab' onClick={(e)=>{
			setlastindex(lastindex+factor)
}}>Show More</button>

	<button className={(lastindex<=factor)?"hide":""}  id='ab' onClick={(e)=>{
			setlastindex(lastindex-factor)
}}>Show Less</button>

</div>

</div>
</div>


			
</>
		)
}

export default Dashboard