import React from 'react'
import { useReducer,useEffect,useState} from 'react'
import CardMain from './CardMain';
import Pagination from './Pagination';
import { useAuth } from './Auth';






const Cards = ({sinput,filter}) => {
 

	const actionname={
		fetch_start:"fetch_start",
		fetch_su:"fetch_su",
		fetch_error:"fetch_error",
		searchinput:"searchinput",
		curpage:"curpage",
		postsperpage:"postsperpage",
		curposts:"curposts",
		lastpostindex:"lastpostindex",
		firstpostindex:"firstpostindex"
	}

let point=9;

	let initialValue={
		details:[],
		img:[],
		
		loading:true,
		error:false,
		curpage:1,
 show:true,
		postsperpage:point,
		lastpostindex:point,
		firstpostindex:0,
	
	}

	const {carddata,isOk}=useAuth()

	const apifetch=async ()=>{
		try {
dispatch({type:actionname.fetch_su,payload:{data:carddata}})  
		} catch (error) {
			dispatch({type:actionname.fetch_error})
			
		}
		
	}



	const reducer=(state,action)=>{

		switch(action.type){
	
			case actionname.fetch_start:
				return{
					...initialValue
				}
	
				case "fetch_su":
	
					return{
						...initialValue,
						details:action.payload.data,
 
						loading:false,
						error:false,
					}
					case actionname.fetch_error:
						return{
							...initialValue,
							
							loading:false,
							error:true,
						}
	
							
								case "updatepage":
									return{
										...state,
										curpage:action.payload.cpage,
										lastpostindex:state.postsperpage*action.payload.cpage,
										firstpostindex:state.postsperpage*action.payload.cpage-state.postsperpage
									}
						
											case "intialpage":
									return{
										...initialValue,
										lastpostindex:point,
										firstpostindex:0
									}
		}
	
	}


const [checking,setchecking]=useState(isOk)


	const [state,dispatch]=useReducer(reducer,initialValue)

	
useEffect(()=>{
apifetch()

},[])



	
	
	if(state.loading){
		return <><h1>Loading......</h1></>
	}

	if(state.error){
		return <><h1>Error......</h1></>
	}




	let searchInput=state.details.filter((cur)=>{
		if(!sinput && !state.show){
state.show=true
	state.firstpostindex=0
	state.lastpostindex=9}
		return cur[filter.toLowerCase()].toLowerCase().startsWith(sinput.toLowerCase())
		})

if(sinput){
	state.firstpostindex=0
	state.lastpostindex=searchInput.length
	state.show=false
}

 
		return (
	<>
	<div className="containerCard">
	{searchInput.slice(state.firstpostindex,state.lastpostindex).map((card,index)=>{
		
   return <CardMain key={index} islogin={checking} data={card} links={[card.facebooklink,card.instralink,card.linkedinlink,card.whatsapplink]}/>
	})}
	</div>
	<Pagination
data={state} updatepage={dispatch} totalpostlength={searchInput.length}/>

	</>
		)
}

export default Cards