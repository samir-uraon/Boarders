import React from 'react'
import "./Admin.css"
import {NavLink} from "react-router-dom"
import gsap from 'gsap'



const AdminSlideBar = () => {



		return (
 <>
	<div className="slidebar">
<div className="closeopenbutton">
	<p><i className="fa-solid fa-skull-crossbones" onClick={()=>{
		gsap.to(".slidebar",{x:-210,duration:0.8,opacity:0})
	}} ></i></p>

</div>
	<nav>
		<ul>
						<NavLink to="/admin"  rel="noopener noreferrer"><li><i className="fa-solid fa-house-user"></i> Home</li></NavLink>

			<NavLink to="/admin/Notification"  rel="noopener noreferrer"><li><i className="fa-regular fa-bell"></i> Notification</li></NavLink>
			<NavLink to="/admin/MessBill"  rel="noopener noreferrer"><li><i className="fa-solid fa-money-check-dollar"></i> Mess Bill</li></NavLink>
			<NavLink to="/admin/Footer"  rel="noopener noreferrer"><li><i className="fa-solid fa-arrows-down-to-line"></i> Footer</li></NavLink>
					<NavLink to="/admin/AdminsList"  rel="noopener noreferrer"><li><i className="fa-solid fa-users"></i> Admis List</li></NavLink>

		</ul>
	</nav>
</div>
	</>
		)
}

export default AdminSlideBar