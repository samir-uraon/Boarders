import React from 'react'
 
import "./Cardmain.css"
import {  toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';



const CardMain = ({data,links,islogin}) => {

  



		return (
			<>
	
    <div className="search_data">
            <div className="image_div">
              
             <img src={data.profile} alt="error" loading='lazy'/>
           </div>
            <div className="details">
             <p><span >Name : </span>{data.name}</p>
             <p><span >Department : </span>{data.dept}</p>
             <div className={islogin?"":"hide"}>
             <p ><span >Email : </span><a href={`mailto:${data.email}`} id='sem'>{data.email}</a></p>
             <p><span >Passing Year : </span>{data.passingyear}</p>
             <p><span >University : </span>Jadavpur University</p>
             <p><span >HostelRoomNo : </span>{data.roomno}</p>
             <p><span >Home : </span>{data.home}</p>
             </div>
            </div>
           {/*<a href="https://unsplash.com/photos/golden-cylinder-with-glass-spheres-and-christmas-ornaments-around-it-for-product-display-3d-rendering-K0pdfzPHAsI" target="_blank">More Details</a>*/}
           <div className="butcontainer">
            {
            }
  <a><i className="fa-brands fa-facebook" style={{color:"rgb(12, 96, 223)"}}   onClick={(e)=>{ 
    
    if(islogin){
    links[0].charAt(links[0].length-1)=="#"?toast.info('Link Not Provided',{className:"test"}):window.open(links[0])

    }else{
      toast.warn("Please,Login....")
    }

}}></i></a>


  <a onClick={(e)=>{
    if(islogin){
links[1].charAt(links[1].length-1)=="#"?toast.info('Link Not Provided',{className:"test"}
):window.open(links[1])}else{
  toast.warn("Please,Login....")
}
}
}><i className="fa-brands fa-instagram" style={{color:"rgb(177, 67, 118)"}}></i></a>
  <a onClick={(e)=>{
    if(islogin){
    links[2].charAt(links[2].length-1)=="#"?toast.info('Link Not Provided',{className:"test"}):window.open(links[2])}else{
      toast.warn("Please,Login....")
    }
  }
    
    }>
      <i className="fa-brands fa-linkedin" style={{color:"blue"}}></i></a>
  <a onClick={(e)=>{
    e.preventDefault()
    if(islogin){
`https:/wa.me/${links[3]}`.charAt(`https:/wa.me/${links[3]}`.length-1)=="#"?toast.info('Link Not Provided',{className:"test"}):window.open(links[3])}
    else{
      toast.warn("Please,Login....",{className:"test"})
    }
    }}>
      <i className="fa-brands fa-whatsapp" style={{color:"rgb(12, 185, 53)"}}>
  
  </i>
  </a>
  </div>
  </div>

  <ToastContainer

/>
		</>
		)
}

export default CardMain