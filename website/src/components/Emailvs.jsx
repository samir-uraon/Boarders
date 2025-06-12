import React from 'react'
import {NavLink} from "react-router-dom"
const Emailvs = () => {
		return (
			<div className="center2">
				<img src="https://static.vecteezy.com/system/resources/previews/017/177/791/large_2x/round-check-mark-symbol-with-transparent-background-free-png.png" alt="" />
		  <h2>Email Verified</h2>
				<NavLink to="/Login"><button style={{backgroundColor:"black"}}>Login</button></NavLink>
			</div>
		)
}

export default Emailvs