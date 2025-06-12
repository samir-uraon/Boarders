import React from 'react'
import "./Pagination.css"




const Pagination = ({totalpostlength,data,updatepage,check}) => {
 

	let pages=[]

	for (let i = 1; i <= Math.ceil(totalpostlength / data.postsperpage); i++) {
		pages.push(i);
}

if(totalpostlength<=data.postsperpage){
	return( 
		<>
		</>
	)
}


		return (
		<>
			<div className="buttons" style={data.show?{display:"block"}:{display:"none"}}>
				
			{pages.map((page,index)=>{
return <button key={index} className={(data.curpage==page)?'active':""}   onClick={
	()=>{
		updatepage({type:"updatepage",payload:{cpage:page}})
	}
}>
	{page}
</button>
			})}
		</div>
			
		</>
		)
}

export default Pagination