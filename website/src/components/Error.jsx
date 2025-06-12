import React from 'react'
import { NavLink } from 'react-router-dom'
const Error = () => {
		return (
			<>
			<div className="center2">
			<h1 style={{margin:"2rem",fontSize:"5rem"}}>404 Error</h1>
			<h2 style={{marginBottom:"1rem"}}>Page Not Found</h2>
<NavLink to="/Home">			<button style={{padding:"0.5rem 2.5rem",fontSize:"1.5rem",backgroundColor:"black"}}>Go Home <i className="fa-solid fa-house" style={{marginLeft:"0.3rem"}}></i></button></NavLink></div>
			</>
				
		)
}

export default Error