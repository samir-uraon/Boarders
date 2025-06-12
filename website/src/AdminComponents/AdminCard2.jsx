import React from 'react'
import { toast,ToastContainer } from 'react-toastify'

const AdminCard2 = ({data,rank}) => {
		return (
				<>
	<div className="search_data adc">
												<div className="image_div">
														
													<img src={data.profile} alt="error" loading='lazy'/>
											</div>
												<div className="details add">
													<p><span>Admin : #{rank}</span></p>
														<p><span >Id : </span>{data._id}</p>
													<p><span >Name : </span>{data.name}</p>
             <p ><span >Email : </span><a href={`mailto:${data.email}`} id='sem'>{data.email}</a></p>
													<p><span >Department : </span>{data.dept}</p>
													<p><span >Passing Year : </span>{data.passingyear}</p>
													<p><span >University : </span>Jadavpur University</p>
													<p><span >HostelRoomNo : </span>{data.roomno}</p>
													<p><span >Home : </span>{data.home}</p>
													<p><span >Email Verify : </span>{(data.emailverification)?"Verified":"Not Verified"}</p>
													<p><span >Profile Verify : </span>{(data.profileverification)?"Verified":"Not Verified"}</p>
													<p><span >time : </span>{data.admintime}</p>
													<p><span >lastupdate : </span>{data.lastupdate}</p>
													<p><span >Home : </span>{data.home}</p>
<p><span >Reference Admin : </span>{data.referenceAdmin}</p>
<p><span >Reference Admin's ID : </span>{data.referenceId}</p>
												</div>
											<div className="butcontainer adfb">
												
		<a><i className="fa-brands fa-facebook" style={{color:"rgb(12, 96, 223)"}}   onClick={(e)=>{ 
				
			
				data.facebooklink.charAt(data.facebooklink.length-1)=="#"?toast.info('Link Not Provided',{className:"test"}):window.open(data.facebooklink)

			
}}></i></a>


		<a><i className="fa-brands fa-instagram" style={{color:"rgb(177, 67, 118)"}} onClick={(e)=>{
			
data.instralink.charAt(data.instralink.length-1)=="#"?toast.info('Link Not Provided',{className:"test"}
):window.open(data.instralink)
}
}></i></a>
		<a>
						<i className="fa-brands fa-linkedin" style={{color:"blue"}}  onClick={(e)=>{
			
				data.linkedinlink.charAt(data.linkedinlink.length-1)=="#"?toast.info('Link Not Provided',{className:"test"}):window.open(data.linkedinlink)
		}
				
				}></i></a>
		<a >
						<i className="fa-brands fa-whatsapp" style={{color:"rgb(12, 185, 53)"}} onClick={(e)=>{
				
			
data.whatsapplink.charAt(data.whatsapplink.length-1)=="#"?toast.info('Link Not Provided',{className:"test"}):window.open(`https:/wa.me/${data.whatsapplink}`)
		
				}}>
		
		</i>
		</a>
		</div>
	 
		</div>

		<ToastContainer

/>
				</>
		)
}

export default AdminCard2