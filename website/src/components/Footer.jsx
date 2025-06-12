import React, { useEffect, useRef, useState } from 'react'
import "./Footer.css"
import { toast,ToastContainer } from 'react-toastify';


const Footer = () => {

    const [isdata, setisdata] = useState([]);

const firstdo=async ()=>{
let res=await fetch(`${import.meta.env.VITE_backendurl}footers`,{credentials:"include"})
let resd=await res.json()
//console.log(resd);

if(res.status==200){
setisdata(resd.data)
}else{
    setisdata(resd.data)
}
}
useEffect(() => {
    
firstdo()

}, []);

		return (
				<>
				
				<footer>
        <div className="bottom">
								<div className="footer-content">
                <h3>About Us</h3>
                 <ul className="list">
                    <li>Our hostel provides well-equipped facilities and a welcoming
																					 atmosphere for students to live, learn, and grow. <span style={{color:"#535bf2",cursor:"pointer"}} onClick={()=>{
                    isdata.hostellink.charAt(isdata.hostellink.length-1)=="#"?toast.info('Link Not Provided',{className:"test"}):window.open(isdata.hostellink)
                 }}>Visit Our Hostel</span></li>
                  
                 </ul>
            </div>
								<div className="footer-content" >
                <h3>Follow Us</h3>
                <ul className="social-icons">
                 <li onClick={()=>{
                (!isdata.facebooklink ||  isdata.facebooklink.charAt(isdata.facebooklink.length-1)=="#")?toast.info('Link Not Provided',{className:"test"}):window.open(isdata.facebooklink)
                 }}> <i className="fab fa-facebook"></i></li>
                 <li onClick={()=>{
                (!isdata.youtubelink || isdata.youtubelink.charAt(isdata.youtubelink.length-1)=="#")?toast.info('Link Not Provided',{className:"test"}):window.open(isdata.youtubelink)
                 }}><i className="fa-brands fa-youtube"></i></li>
                 <li onClick={()=>{
                    (!isdata.instralink || isdata.instralink.charAt(isdata.instralink.length-1)=="#")?toast.info('Link Not Provided',{className:"test"}):window.open(isdata.instralink)
                 }}><i className="fab fa-instagram"></i></li>
                 <li onClick={()=>{
                    ( !isdata.linkedinlink || isdata.linkedinlink.charAt(isdata.linkedinlink.length-1)=="#")?toast.info('Link Not Provided',{className:"test"}):window.open(isdata.linkedinlink)
                 }}><i className="fab fa-linkedin"></i></li>
                </ul>
                </div>
            <div className="footer-content">
                <h3>Contact Us</h3>
                <p>Email:<a  href={`mailto:${isdata.adminemail}`} target='_blank'>Admin@gmail.com</a></p>
                <p>Address:<a href='https://maps.app.goo.gl/rTCqacnDEspYq7M36' target='_blank'>Kolkata,SaltLake Sector-3 ,Bidhannagar West Bengle</a></p>
            </div>
           
            
        </div>
        <div className="bottom-bar">
            <p>&copy;Hostel2025 . All rights reserved</p>
        </div>
    </footer>
				<ToastContainer/>
				</>
		)
}

export default Footer