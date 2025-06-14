import React from 'react'
import { useEffect ,useReducer} from 'react'
import {useNavigate } from 'react-router-dom'
import { useAuth } from './Auth'


const Logout = () => {
 const {isOk,setisOk}=useAuth()
	let navigate=useNavigate()
let initialValue={
	loading:true
}

const reducer=(state,action)=>{
 switch (action.type) {
		case "fetch_start":
			return{...initialValue}
			break;
				case "fetch_end":
			return {
				loading:false
			}
			break;
	
		default:

			break;
	}
}
	const [state,dispatch]=useReducer(reducer,initialValue)

const apifetch=async()=>{

dispatch({type:"fetch_start"})
let res=await fetch(import.meta.env.VITE_logout,{credentials:"include"})
let data=await res.json()

localStorage.clear() 
		sessionStorage.clear()

if(data.goto){

setisOk(false)

setTimeout(()=>{

dispatch({type:"fetch_end"})
navigate(data.goto)

},2000)

}else{
navigate("/Login")
dispatch({type:"fetch_end"})
}

}



	useEffect(()=>{

apifetch()


	},[])

	if(state.loading){
		return(
			<>
					<div className="center2">
	<div className="loader">
					<span className="loader-text">Loading</span>
							<span className="load"></span>
			</div>
		</div>
			</>
		)
	}

		return (
		<></>
		)
}

export default Logout