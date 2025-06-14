const mongoModel2=require("./SessionsList")
const {mongoModel4,mongoModel3, mongoModel5}=require("./adminsessionlist")
 

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const {mongodb_model}=require("./mongo")

const VerifyToken=(token)=>{
	try {
		return jwt.verify(token,
		process.env.jwt_secret_key)
} 
catch (error) {
		return null
	}
}

const VerifyToken2=(token)=>{
	try {
		return jwt.verify(token,
		process.env.jwt_secret_key2)
} 
catch (error) {
		return null
	}
}


const getAccessToken=({	userId,userName,userEmail,userSessionId})=>{

		return jwt.sign({
				userId,
				userName,
					userEmail,
	userSessionId
		},
		process.env.jwt_secret_key,
		{
			expiresIn:process.env.accessToken_expires
		}
		)


}


const getRefreshToken=(data)=>{

		
		return jwt.sign({
			SId:data,
		},
		process.env.jwt_secret_key,
		{
			expiresIn:process.env.refreshToken_expires
		}
		)
}

const comparePassword2=async (id,data)=>{

	
	let test=await mongoModel5.findOne({userid:id})

	
	if(test){


    if(test.password==data){
					return true
				}else{
					return false
				}
	}else{
		return null
	}

}




const findUserById=async (userid)=>{
let test=await mongodb_model.findOne({_id:userid})
return test
}


const getnewRefreshToken= async (uid,sid)=>{

try {

	let test2= await findUserById(uid)

	if(!test2){
		return null
	}
	const userInfo={
   	userId:test2._id,
				userName:test2.name,
					userEmail:test2.email,
	userSessionId:sid
	}
	const newAccessToken=getAccessToken(userInfo)
const newRefreshToken=getRefreshToken(sid)
let data={
	newAccessToken,newRefreshToken,userInfo
}
return data

} catch (error) {
	
	return null

}
}


const VerifyAuthantication=async (req,res,next)=>{

	req.user=null
	let accesstoken=req.cookies["Access_Token"]
		let refreshtoken=req.cookies["Refresh_Token"]




		if(!accesstoken && !refreshtoken){

return next()
}

else if(accesstoken){
let verify=VerifyToken(accesstoken)
let check=await mongodb_model.findOne({_id:verify.userId,emailverification:true,profileverification:true})
	
	
	if(check){

		req.user=verify
		return next()
	}
	else{
		
	req.user=null
			req.session.destroy()
			res.clearCookie("Access_Token")
			res.clearCookie("Refresh_Token")
return next()}

}


else if(refreshtoken){

	try {
		
		let verifydata=VerifyToken(refreshtoken)
		
		const test=await mongoModel2.findOne({SessionId:verifydata.SId})
		let check2=await mongodb_model.findOne({_id:test.UserId,emailverification:true,profileverification:true})

		
		if(!test || !check2){
			req.user=null
			req.session.destroy()
			res.clearCookie("Access_Token")
			res.clearCookie("Refresh_Token")
			return next()
		}
		let sid=verifydata.SId
		let uid=test.UserId

		let data=await getnewRefreshToken(uid,sid)

		if(data){
//console.log(data);

		const {newAccessToken,newRefreshToken,userInfo}=data

req.user=userInfo

res.cookie("Access_Token",newAccessToken, {
    httpOnly: true,
    secure: true, // Set to true in production (HTTPS)
    sameSite:"none" ,

			
    path: '/',
    maxAge: 15 * 60 * 1000 // 15 Minutes
  })
res.cookie("Refresh_Token",newRefreshToken, {
    httpOnly: true,
    secure: true, // Set to true in production (HTTPS)
    sameSite:"none" ,
    path: '/',
							

    maxAge: 7*24*60* 60 * 1000 // 7 day
  })
		return next()
	}
	return next()

	} catch (error) {

				return next()
	}

}
else{
	return	next()}

}




const findUserById2=async (userid)=>{
let test=await mongoModel4.findOne({userid:userid})
return test
}

const getAccessToken2=({	userId,userName,userEmail,userSessionId})=>{

		return jwt.sign({
				userId,
				userName,
					userEmail,
	userSessionId
		},
		process.env.jwt_secret_key2,
		{
			expiresIn:"5m"
		}
		)


}


const getRefreshToken2=(data)=>{

		
		return jwt.sign({
			SId:data,
		},
		process.env.jwt_secret_key2,
		{
			expiresIn:"1h"
		}
		)
}


const getnewRefreshToken2= async (uid,sid)=>{

try {


	let test2 = await findUserById2(uid)

	if(!test2){
		return null
	}
	const userInfo={
   	userId:test2.userid,
				userName:test2.name,
					userEmail:test2.email,
	userSessionId:sid
	}
	const newAccessToken=getAccessToken2(userInfo)
const newRefreshToken=getRefreshToken2(sid)
let data={
	newAccessToken,newRefreshToken,userInfo
}
return data

} catch (error) {
	
	return null

}
}


const middelware=async (req,res,next) => {

	req.user2=null
	let accesstoken2=req.cookies["Access_Token2"]
		let refreshtoken2=req.cookies["Refresh_Token2"]

//console.log(accesstoken2);
//console.log("refresh : ",refreshtoken2);



		if(!accesstoken2 && !refreshtoken2){

return next()
}



else if(accesstoken2){

	let verify=VerifyToken2(accesstoken2)
 
	
	let check=await mongoModel4.findOne({userid:verify.userId})
	let check2=await mongodb_model.findOne({_id:verify.userId,emailverification:true,profileverification:true})
	
	if(check && check2){

		req.user2=verify
		return next()
	}
	else{
		
	req.user2=null
			req.session.destroy()
			res.clearCookie("Access_Token2")
			res.clearCookie("Refresh_Token2")
return next()
}
}


else if(refreshtoken2){

	try {
		
		let verifydata=VerifyToken2(refreshtoken2)
	
		

		const test=await mongoModel3.findOne({SessionId:verifydata.SId})
			let check=await mongoModel4.findOne({userid:test.UserId})

			
		if(!test || !check){
			req.user=null
			req.session.destroy()
			res.clearCookie("Access_Token2")
			res.clearCookie("Refresh_Token2")
			return next()
		}

		let sid=verifydata.SId
		let uid=test.UserId

		

		let data=await getnewRefreshToken2(uid,sid)
//console.log("data : ",data);

		if(data){

		const {newAccessToken,newRefreshToken,userInfo}=data

req.user2=userInfo

res.cookie("Access_Token2",newAccessToken, {
    httpOnly: true,
				// secure: true, // Set to true in production (HTTPS)
    secure: true, // Set to true in production (HTTPS)
    sameSite:"none" ,
    path: '/',
							

    maxAge: 5 * 60 * 1000 // 5 Minutes
  })
res.cookie("Refresh_Token2",newRefreshToken, {
    httpOnly: true,
    secure: true, // Set to true in production (HTTPS)
    sameSite:"none" ,
    path: '/',
							

    maxAge:60* 60 * 1000 // 1 hours
  })
		return next()
	} 
	return next()

	} catch (error) {

				return next()
	}

}
else{
	return	next()}
}


const genhashpassword=async(data)=>{
			let salt= await bcrypt.genSalt(Number(process.env.saltlen))
	let newpassword=await bcrypt.hash(data,salt)
	return newpassword
}



module.exports={getAccessToken,getRefreshToken,middelware,
	VerifyAuthantication,VerifyToken,VerifyToken2,genhashpassword,comparePassword2,getAccessToken2,getRefreshToken2}