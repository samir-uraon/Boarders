const express=require("express")
const upload=require("express-fileupload")
const bodyParser=require("body-parser")
const dotenv=require("dotenv")
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken")
var cors = require('cors')
dotenv.config()
const cookieParser=require("cookie-parser")
const session=require("express-session")
const requestIp=require("request-ip")
const {getAccessToken,getRefreshToken,middelware,VerifyAuthantication, VerifyToken,genhashpassword, getAccessToken2, VerifyToken2,comparePassword2, getRefreshToken2}=require("./AuthService.js")
  



const crypto=require("crypto")
const app=express()
const {mailit,emailvemailsend,mailit22,mes22,mailit21,profilevemsend,forgetpasswordemail, forgetpasswordemailforadmin}=require("./mailtransfer")
app.use(upload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors(({
  origin: 'https://boarders.onrender.com',  // React dev server
  credentials: true
})))

app.use(session({
	secret:process.env.session_secret,
	resave:false,
	 saveUninitialized: false,
	cookie:{httpOnly:true,
secure:false
}
}))
 
app.use(cookieParser())
app.use(requestIp.mw())



const mongoose=require("mongoose")
let mongodb_url=process.env.mongourl
const {mongodb_model,footer_model}=require("./mongo")
const Token=require("./TokenCreate")
const mongoModel2=require("./SessionsList")
const {mongoModel3,mongoModel4, mongoModel5}=require("./adminsessionlist.js")









mongoose.connect(mongodb_url).then(()=>{console.log("Connect...");
})
.catch((error)=>{
	console.log(error.message);
	
})
 
app.use(middelware)



app.get("/admin/newadmin",async (req,res)=>{
if(req.user2){
res.status(200).json()
}else{
	res.status(404).json()
}

})

app.post("/admin/newadmin",async (req,res)=>{

 let check=false

//req.user2={
//   	userId:test2._id,
//				userName:test2.name,
//					userEmail:test2.email,
//	userSessionId:sid
//	}

if(req.user2){

let usersendemail=req.body.Email
	try {
let test2=await mongoModel4.findOne({email:usersendemail})

if(!test2){


		let data=await mongodb_model.findOne({email:usersendemail})

 
if(data){

			let data2=await mongodb_model.findOne({email:usersendemail,emailverification:true,profileverification:true})

			if(data2){

				let gentoken=data2.gettoken3()

		let sendtoken=await new Token({
		userId:data2._id,
		token:gentoken
	})
	 
await sendtoken.save()

	let linkurl=`${process.env.page_url}user/${sendtoken.userId}/access/${sendtoken.token}`

	let test=await mongoModel4.findOne()


mailit21(usersendemail,data.name.split(" ")[0],linkurl,test.email,test.name)

	check=true
 res.status(200).json({status:check,mes:"Link send in this Email"})

}else{
		check=false
 res.status(400).json({status:check,mes:"This User is not Verified"})
}
}else{
		check=false
 res.status(400).json({status:check,mes:"Email not Registerted"})

}

}else{
	check=false
 res.status(250).json({status:check,mes:"Already Exist as Admin Email"})
}
} catch (error) {
		//console.log(error.message);
		
	check=false
 res.status(500).json({status:check,mes:"Internal Server Error"})
}
}
else{
	check=false
	res.json({status:check,mes:null})
}
})


app.get("/user/:id/access/:token",async(req,res)=>{

 
	

	if(req.user2){
try {

	
	let data=req.params
 
	
	let userexist=await Token.findOne({userId:data.id})
  let newpassword=crypto.randomBytes(5).toString("hex")
  
	
	

if(userexist){
let decodedata=VerifyToken2(data.token)
	if(decodedata){

		let prof=new mongoModel4({

		profile:decodedata.profile,
			profileverification:	decodedata.profileverification,
	emailverification:decodedata.emailverification,
		userid:decodedata.userid,
		name:decodedata.name,
		email:decodedata.email,
		dept:decodedata.dept,
		passingyear:decodedata.passingyear,
		home:decodedata.home,
		roomno:decodedata.roomno,
	coords:decodedata.coords,
	lastupdate:decodedata.lastupdate,
 resistertime:decodedata.resistertime,
	facebooklink:decodedata.facebooklink,
	instralink:decodedata.instralink,
	linkedinlink:decodedata.linkedinlink,
	whatsapplink:decodedata.whatsapplink
,referenceAdmin:req.user2.userName,
referenceId:req.user2.userId
	})

	let newp=await prof.save()
 //console.log(newp);

await footer_model.updateOne({adminemail:decodedata.email})
				await Token.findOneAndDelete({userId:data.id})
			
let take=new mongoModel5({
	name:decodedata.name,
	userid:decodedata.userid,
password:newpassword})
await take.save()

				mailit22(decodedata.email,mes22(decodedata.name,decodedata.email,`${process.env.page_url}admin`,req.user2.userEmail,req.user2.userName,newpassword))
		res.status(200).json({message:"You are Admin Now",prof:decodedata.profile})
		
		}else{
			res.status(404).json({message:"Invalid Link"})
			}
	}



else{

res.status(404).json({message:"Invalid Link"})
}

} catch (error) {
//console.log(error.message);

	res.status(500).json({massage:"Internal Server Error"})
}}else{res.status(404).json({message:null})}
})



//app.get("/getprofile",async (req,res)=>{

//	let data=await mongodb_model.findOne({email:"pclenovo780@gmail.com"})

//	let test2=new mongoModel4({
//	profile:data.profile,
//		name:data.name,
//		email:data.email,
//			userid:data._id,
//		dept:data.dept,
//		passingyear:data.passingyear,
//		home:data.home,
//		roomno:data.roomno,
//	coords:data.coords,
//	lastupdate:data.lastupdate,
// resistertime:data.time,
//	facebooklink:data.facebooklink,
//	instralink:data.instralink,
//	linkedinlink:data.linkedinlink,
//	whatsapplink:data.whatsapplink,
//referenceAdmin:data.name,
//referenceId:data._id
//	})

//	await test2.save()

//	res.send("ok")
//})


app.get("/admins",async(req,res)=>{
	//console.log(req.user2);
	
 if(req.user2){
		let test=await mongoModel4.find()
	
	res.json({test:test,isVerify:true})
}
else{
	res.json({test:[],isVerify:false})
}
})

app.get("/admin",async(req,res)=>{

let test=await mongodb_model.find()
//console.log(req.user2);

if(req.user2){
	res.json({test,isVerify:true})
}
else{
	res.json({test:[],isVerify:false})
}
})

app.post("/admin",async(req,res)=>{
	try {
		
	 let {Email,Password}=req.body

		
		let test=await mongoModel4.findOne({email:Email})
 
	let test2=await mongodb_model.findOne({email:Email,profileverification:true})

		
		
		if(!test){
			return res.status(401).json({message:"Only For Admin"});
		}
		if(test && !test2 && !test.emailverification){
							return res.status(440).json({ message: "Your Profile was Deleted" })
			}
if(!test2){
					return res.status(450).json({ message: "Profile Not Verified By Admin" })
	}


		let setuserAgent=req.headers["user-agent"]
		let sessionid=req.session.id
		let ipaddress=req.clientIp

let checkpassword= await comparePassword2(test.userid,Password)



	if (checkpassword) {
    let date=new Date().toLocaleString()
let newsession=new mongoModel3({
	UserName:test.name,
	SessionId:sessionid,
	UserId:test.userid,
	userAgent:setuserAgent,
IP:ipaddress,
Time:`${date}`
}) 

let newsessionsave=await newsession.save()
if(newsessionsave){

let baseConfig={httpOnly:true,secure:true};

const actoken=getAccessToken2({
	userId:test.userid,
				userName:test.name,
					userEmail:test.email,
	userSessionId:sessionid
})

const restoken=getRefreshToken2(sessionid)
 
res.cookie("Access_Token2",actoken, {
    httpOnly: true,
    secure: true, // Set to true in production (HTTPS)
    sameSite: 'Strict',
    path: '/',
    maxAge: 5 * 60 * 1000 // 5 Minutes
  })

 res.cookie('Refresh_Token2', restoken, {
    httpOnly: true,
    secure: true, // Set to true in production (HTTPS)
    sameSite: 'Strict',
    path: '/',
    maxAge:  60 * 60 * 1000 // 1 hours
  });


let test2=await mongodb_model.find()

res.json({
	isVerify:true,test:test2
})
}
else {
					res.status(500).json({message:"Internal Server Error!"})	
	}

	} else {
					return res.status(420).json({ message: "Invalid credencial" })
	}



} catch (error) {
	//console.log(error);
	
	res.status(500).json({message:"Internal Server Error!"})	
}


})

app.post("/Admin/Forgetpassword",async(req,res)=>{
try	{
	let data=req.body.Email
	let Emailexist=false

	let test=await mongoModel4.findOne({email:data,profileverification:true,emailverification:true})
	
	if(test){
		let test2=await mongoModel5.findOne({userid:test.userid})
		if(test2){
		Emailexist=true
		mailit(data,"Forget Password",forgetpasswordemailforadmin(test.name.split(" ")[0],test2.password))
		res.status(200).json({Emailexist:Emailexist})
			
		}else{
				Emailexist=false
		res.status(404).json({Emailexist:Emailexist})
	}
}

	else{
		res.status(444).json({Emailexist:Emailexist})
	}
}	catch (error) {
	//console.log(error);
	res.status(500).json({message:"Internal Server Error!"})
	}	
})


app.get("/Admin/Logout",middelware,async (req,res)=>{

 
	if(req.user2){
		let test1=await mongoModel3.deleteOne({SessionId:req.user2.userSessionId})
 
		
		if(test1){
					
					req.session.destroy()
			res.clearCookie("Access_Token2")
			res.clearCookie("Refresh_Token2")
		res.json({"ok":"done"})
		}
	}else{
		
	res.json({"ok":"error"})
	}

})






app.get("/footers",async(req,res)=>{
 
	try {
		let a=await footer_model.findOne()
			let check=await mongoModel4.findOne()
	if(check){
		await footer_model.updateOne({adminemail:check.email})
	}
		res.status(200).json({data:a})
	} catch (error) {
		res.status(404).json({data:null})
	}
 

})


app.post("/footers/addlinks",async(req,res)=>{

	let {target,setit}=req.body
 	
	if(req.user2){

		try {
		let a=await footer_model.findOne()
		if(a[target]){
		
 await footer_model.updateOne({[target]:setit})
 
		res.status(200).json({data:"ok"})
	}else{
				res.status(404).json({data:null})
	}
	} catch (error) {
		res.status(500).json({data:null})
	}
	}else{
		res.status(400).json({data:"error"})
	}

})





app.use(VerifyAuthantication)
app.get("/",async(req,res)=>{
try{
let test=await mongodb_model.find({profileverification:true,emailverification:true}).select({lastupdate:false,	profileverification:	false,
	emailverification:false,time:false,	coords:false,password:false,__v:false,_id:false,adminPower:false})

if(req.user){

	res.json({test,isVerify:true})
}
else{
	res.json({test,isVerify:false})
}
}catch{
		res.json({test:[],isVerify:false})
}
})
 

app.post("/tokenverify",async (req,res)=>{

	let Emailexist=false

	try {
		
	let data=req.body
	
	let test=await mongodb_model.findOne({email:data.Email})
 
	

	if(test){
if(test.emailverification){

	if(test.profileverification){
		Emailexist=true
				
		let setuserAgent=req.headers["user-agent"]
		let sessionid=req.session.id
		let ipaddress=req.clientIp

		 let date=new Date().toLocaleString()
let newsession=new mongoModel2({
	UserName:test.name,
	SessionId:sessionid,
	UserId:test._id,
	userAgent:setuserAgent,
IP:ipaddress,
Time:`${date}`
}) 

let newsessionsave=await newsession.save()
if(newsessionsave){


const actoken=getAccessToken({
	userId:test._id,
				userName:test.name,
					userEmail:test.email,
	userSessionId:sessionid
})

const restoken=getRefreshToken(sessionid)
 
res.cookie("Access_Token",actoken, {
    httpOnly: true,
    secure: true, // Set to true in production (HTTPS)
    sameSite: 'Strict',
    path: '/',
    maxAge: 15 * 60 * 1000 // 15 Minutes
  })

 res.cookie('Refresh_Token', restoken, {
    httpOnly: true,
    secure: true, // Set to true in production (HTTPS)
    sameSite: 'Strict',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

		return res.status(200).json({Emailexist:Emailexist,userId:test._id})

	}else{
		Emailexist=false
	return res.status(400).json({Emailexist:Emailexist,userId:null})
}
	} else{
				Emailexist=false
	return res.status(401).json({Emailexist:Emailexist,mes:"Your Profile Not Verified by Admin Now"})
	}
	} else{
				Emailexist=false
	return res.status(401).json({Emailexist:Emailexist,mes:"Complete your Email Verification"})
	}
	} else{
				Emailexist=false
	return res.status(401).json({Emailexist:Emailexist,mes:"This Email was Not Register"})
	}
}catch (error) {
		Emailexist=false
			return res.status(400).json({Emailexist:Emailexist,mes:"Internal Server Error"})
	}
})


app.get("/Profile",async (req,res)=>{
//console.log(req.user);

	if(req.user){
try {

	let data=req.user
	
	
	let userexist2=await mongodb_model.findOne({_id:data.userId}).select({profileverification:	false,
	emailverification:false,time:false,	coords:false,password:false,__v:false,_id:false})


	if(userexist2){
		res.status(200).json({verify:userexist2})
	}else{
			res.status(404).json({verify:[]})
			}

} catch (error) {

	res.status(500).json({verify:[]})
}
	}else{
					res.status(404).json({verify:[]})
	}

})


app.get("/MessBill",async (req,res)=>{

try {

	let data=req.user
	
	
	let userexist2=await mongodb_model.findOne({_id:data.userId}).select({profileverification:	false,
	emailverification:false,time:false,	coords:false,password:false,__v:false,_id:false})


	if(userexist2){
		res.status(200).json({verify:userexist2})
	}else{
			res.status(404).json({verify:null})
			}

} catch (error) {

	res.status(500).json({verify:null})
}


})


app.get("/existence",async (req,res)=>{
	 
	let data=req.query.Email
	let Emailexist=true
	//console.log(data);
	
	let test=await mongodb_model.findOne({email:data})
	//console.log(test);

	if(!test){
		Emailexist=false
		return res.status(200).json({Emailexist:Emailexist})
	}
		Emailexist=true
	return res.status(400).json({Emailexist:Emailexist})

})

app.post("/forgetpassword",async (req,res)=>{
	


	let data=req.body.Email
	let Emailexist=false
	//console.log(data);
	
	let test=await mongodb_model.findOne({email:data})
	//console.log(test);

	if(test){
		Emailexist=true
		let token=await test.gettoken2()
		let details={name:test.name,link:`${process.env.page_url}api/${test._id}/verify/${token}/reset`}
		mailit(data,"Password Reset",forgetpasswordemail(details))

		res.cookie("Reset_token",token,{
			 httpOnly: true,
    secure: true, // Set to true in production (HTTPS)
    sameSite: 'Strict',
    path: '/',
    maxAge: 60 * 60 * 1000 // 60 Minutes
		})

res.status(200).json({Emailexist:Emailexist})
	}
	else{
		Emailexist=false
res.status(400).json({Emailexist:Emailexist})
}

})

app.post("/api/id/verify/token/changePassword",async (req,res)=>{

	try {

		let usersend=req.body

		let dateinstring=new Date()
		
		let data=req.user.userId

if(data){
		let test=await mongodb_model.findOne({_id:data})
 
		if(test){
			let check=await test.comparePassword(usersend.old)
//console.log(check);

			if(check){
				let newpassword=await genhashpassword(usersend.new1)
		let test2=await mongodb_model.updateOne({_id:data},{password:newpassword,lastupdate:dateinstring.toLocaleString()})
	let test6=	await mongodb_model.findOne({_id:data})
await test6.updateadminprofile()

		res.status(200).json({verify:true})
	}
	else{
		res.status(250).json({verify:false,reason:"old"})
	}
	}
	else{
		res.status(404).json({verify:false})
	}
}	else{
		res.status(400).json({verify:false})
	}

	} catch (error) {
		console.log(error.message);
		
				res.status(500).json({verify:false})
	}

})


app.get("/api/:id/verify/:token/reset",async (req,res)=>{



	try {
		let data=req.cookies["Reset_token"]
 
		//console.log(data);
		


if(data){
		let decodedata = VerifyToken(data)
		//console.log(decodedata);
		
		let test=await mongodb_model.findOne({_id:decodedata.userId})

		if(test){
		res.status(200).json({verify:true})}
	else{
		res.status(400).json({verify:false})
	}
}	else{
		res.status(420).json({verify:false})
	}

	} catch (error) {
		console.log(error.message);
		
				res.status(400).json({verify:false})
	}


})

app.get("/api/reset",async (req,res)=>{



	try {
		let data=req.query
		let date=new Date()


if(data){
		let decodedata = VerifyToken(data.token)
let newpassword=await genhashpassword(data.newpassword)
		let test=await mongodb_model.updateOne({_id:decodedata.userId},{password:newpassword,lastupdate:date.toLocaleString()})
  	let test2=	await mongodb_model.findOne({_id:decodedata.userId})
await test2.updateadminprofile()

		if(test){
  
			res.clearCookie("Reset_token")
		res.status(200).json({message:"Succesfully Reset Your Password"})
	}
	else{
		res.status(400).json({message:"Invalid Url"})
	}
}else{
	res.status(400).json({message:"Invalid Url"})
}
	} catch (error) {
		//console.log(error.message);
		
				res.status(400).json({message:"Invalid Url"})
	}

})
 
app.get("/Add_Links",async (req,res)=>{

	try {
if(req.user){

let test=await mongodb_model.findOne({_id:req.user.userId})
res.status(200).json({data:{fl:test.facebooklink,il:test.instralink,ll:test.linkedinlink,wl:test.whatsapplink}})
	}else{
res.status(404).json({data:null})
	}

} catch (error) {
		//console.log(error.message);
		
		res.status(500).json({data:null})
	}

})

app.post("/Add_Links",async (req,res)=>{

	try {
		 
		let data=req.body
console.log(data);

		let date=new Date()

		
		let test=await mongodb_model.updateOne({_id:req.user.userId},{facebooklink:data.tfl,instralink:data.til,linkedinlink:data.tll,whatsapplink:data.twl,lastupdate:date.toLocaleString()})
	let test2=	await mongodb_model.findOne({_id:req.user.userId})
await test2.updateadminprofile()
	
		
		res.status(200).json({add_link:true})


	} catch (error) {
		//console.log(error.message);
		
		res.status(500).json({add_link:false})
	}

})


app.get("/Edit_Profile",async (req,res)=>{

	try {

if(req.user){

		let test=await mongodb_model.findOne({_id:req.user.userId})
		.select({lastupdate:false,	profileverification:	false,
	facebooklink:false,instralink:false,linkedinlink:false,whatsapplink:false,
	emailverification:false,time:false,	coords:false,password:false,__v:false,_id:false})

res.status(200).json({data:test})

}else{
	res.status(404).json({data:null})
}
	} catch (error) {
 
		res.status(500).json({data:null})
	}

})

app.post("/Edit_Profile",async (req,res)=>{

	try {
		 if(req.user){
		let data=req.body


		

				let date=new Date()
		let userinfo={	
		name:data.Name,
		dept:data.Department,
		passingyear:data.Year,
		home:data.Home,
		roomno:data.Room,
lastupdate:date.toLocaleString()
}
let setuserinfo={...userinfo}

		if(data.Profile){
			setuserinfo={...userinfo,profile:data.Profile}
		}

if(data){ 

		let prof= await mongodb_model.updateOne({_id:req.user.userId},setuserinfo)
	let test2=	await mongodb_model.findOne({_id:req.user.userId})
await test2.updateadminprofile()
		res.status(200).json({add_profile:true})


}else{res.status(500).json({add_profile:false})}
	}else{res.status(404).json({add_profile:false})} }catch (error) {
		console.log(error.message);
		
		res.status(500).json({add_profile:false})
	} 

})



app.post("/Login",async (req,res)=>{
  
	try {
		
	 let {Email,Password}=req.body
  
		let test=await mongodb_model.findOne({email:Email})
 
		
		let setuserAgent=req.headers["user-agent"]
		let sessionid=req.session.id
		let ipaddress=req.clientIp

if(!test){
	return res.status(401).json({message:"Email not Resistered"});
}
else if(test && !test.profileverification){
	return res.status(401).json({message:"Profile not Verified by admin"});
}
else if(test && !test.emailverification){
	return res.status(400).json({message:"Email not verified,please check your Email"});
}

//bcrypt.compare(Password.toString(), test.password,async (err, data) => {

//	if (err) throw err
//console.log(data);

//	if (data) {
     
//res.status(200).json({ message: "Login successful!" ,token: await test.gettoken(),userId:test._id.toString()})
//	} else {
//					return res.status(400).json({ message: "Invalid credencial" })
//	}

//})

let checkpassword= await test.comparePassword(Password)
//console.log(checkpassword);

	if (checkpassword) {
    let date=new Date().toLocaleString()
let newsession=new mongoModel2({
	UserName:test.name,
	SessionId:sessionid,
	UserId:test._id,
	userAgent:setuserAgent,
IP:ipaddress,
Time:`${date}`
}) 

let newsessionsave=await newsession.save()
if(newsessionsave){

let baseConfig={httpOnly:true,secure:true};

const actoken=getAccessToken({
	userId:test._id,
				userName:test.name,
					userEmail:test.email,
	userSessionId:sessionid
})

const restoken=getRefreshToken(sessionid)
 
res.cookie("Access_Token",actoken, {
    httpOnly: true,
    secure: true, // Set to true in production (HTTPS)
    sameSite: 'Strict',
    path: '/',
    maxAge: 15 * 60 * 1000 // 15 Minutes
  })

 res.cookie('Refresh_Token', restoken, {
    httpOnly: true,
    secure: true, // Set to true in production (HTTPS)
    sameSite: 'Strict',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });




res.status(200).json({ message: "Login successful!",Token:actoken})
}
else {
					res.status(500).json({message:"Internal Server Error!"})	
	}

	} else {
					return res.status(400).json({ message: "Invalid credencial" })
	}



} catch (error) {
	//console.log(error);
	
	res.status(500).json({message:"Internal Server Error!"})	
}

})



app.post("/create",async (req,res)=>{
 let check=false
 let data=req.body

	try {
		let testitroom=await mongodb_model.findOne({roomno:data.Room,passingyear:data.Year})
		if(testitroom){
				check=false
		return res.status(209).json({status:check})
		}

 let salt= await bcrypt.genSalt(Number(process.env.saltlen))
 let newpassword= await bcrypt.hash(data.Password,salt)

 let prof=new mongodb_model({
		profileverification:	false,
		emailverification:	false,
		profile:data.Profile,
		name:data.Name,
		email:data.Email,
		password:newpassword,
		dept:data.Department,
		passingyear:data.Year,
		home:data.Home,
		roomno:data.Room,
		coords:data.coords
	})

	let newp=await prof.save()
	console.log(newp);
	
	if(!newp){
		check=false
		return res.status(400).json({status:check})
	}

	let sendtoken=await new Token({
		userId:newp._id,
		token:crypto.randomBytes(Number(process.env.bytes)).toString("hex")
	})
	 
	await sendtoken.save()

	let linkurl=`${process.env.page_url}api/user/${sendtoken.userId}/verify/${sendtoken.token}`
console.log(linkurl);


	let link1=`${process.env.back_url}testing/user/${newp.id}/anything/focus`
		let link2=`${process.env.back_url}testings/user/${newp.id}/anything/focus`
	let link3=`${process.env.back_url}removing/user/${newp.id}/anything/focus`

	console.log(link1);
	console.log(link2);
	console.log(link3);

	let amail=await mongoModel4.findOne()
	console.log(amail.email);
	

mailit(newp.email,"Email Verification",emailvemailsend(newp.name.split(" ")[0],linkurl))
mailit(amail.email,"Profile Verification",profilevemsend(newp,link1,link2,link3))


	check=true
 res.status(200).json({status:check})
} catch (error) {
		//console.log(error.message);
		
	check=false
 res.status(500).json({status:check})
}
	})



app.get("/Logout",async (req,res)=>{

	//console.log("ok then");
	
	if(req.user){
		let test1=await mongoModel2.deleteOne({SessionId:req.user.SessionId})
		if(test1){
					
					req.session.destroy()
			res.clearCookie("Access_Token")
			res.clearCookie("Refresh_Token")
		res.status(200).json({goto:"/"})
		}
	}else{
		
	res.status(250).json({goto:"/login"})
	}

})


	app.get("/testing/user/:id/anything/focus",async (req,res)=>{

		try {
			let data=req.params
			let setdata=true
			//console.log(data);
			
		let test2=await mongodb_model.updateOne({_id:data.id},{profileverification:true})
	let test3=	await mongodb_model.findOne({_id:data.id})
await test3.updateadminprofile()
		 
				
   res.status(200).json({message:"done"})

		}catch(error){
//console.log(error);

res.status(500).json({message:"Server error"})
		}

	})

app.get("/testings/user/:id/anything/focus",async (req,res)=>{

		try {
			let data=req.params
			let setdata=false
			console.log(data);

			await mongodb_model.updateOne({_id:data.id},{profileverification:false})
	let test2=	await mongodb_model.findOne({_id:data.id})
await test2.updateadminprofile()

			
			
   res.status(200).json({message:"done"})
		}catch(error){
//console.log(error);

res.status(500).json({message:"Server error"})
		}

	})

	app.get("/removing/user/:id/anything/focus",async (req,res)=>{

		try {
			let data=req.params
			let date=new Date()
			let userexist=await mongodb_model.findOneAndDelete({_id:data.id})
			await Token.findOneAndDelete({userId:data.id})
			await mongoModel4.updateOne({userid:data.id},{emailverification:false,profileverification:false})
   res.status(200).json({message:"done"})
		}catch{
res.status(500).json({message:"Server error"})
		}

	})


app.get("/api/user/:id/verify/:token",async (req,res)=>{

try {
	let data=req.params
	let userexist=await Token.findOne({userId:data.id})
	let userexist2=await mongodb_model.findOne({_id:data.id})
	console.log(userexist);
		console.log(userexist2);
		console.log(data); 

	if(!userexist2){
		await Token.findOneAndDelete({userId:data.id})
		res.status(404).json({message:"Invalid Link"})
	}

	else if(userexist2 && userexist2.emailverification){
		res.status(200).json({message:"Email Verified"})
	}

 else if(!userexist && !userexist2){
	
		res.status(404).json({message:"Invalid Link"})
	}

else	if(userexist){

	if(data.token==userexist.token){

	let test2=	await mongodb_model.updateOne({_id:data.id},{emailverification:true})
	let test6=	await mongodb_model.findOne({_id:data.id})
await test6.updateadminprofile()
				await Token.findOneAndDelete({userId:data.id})
			res.status(200).json({message:"Email Verified"})
		
		}else{
			res.status(404).json({message:"Invalid Link"})
			}
	}

else if(!userexist2.emailverification && userexist2){
	res.status(201).json({message:"Link Expired"})
}

else{
	await Token.findOneAndDelete({userId:data.id})
res.status(404).json({message:"Invalid Link"})
}

} catch (error) {
console.log(error.message);
	res.status(500).json({massage:"Internal Server Error"})
}
})



app.get("/api/user/:id/resend",async (req,res)=>{
 console.log(req.params);
	
	let {id}=req.params
	let userexist=await mongodb_model.findById(id)
	let tokenexist=await Token.findOne({userId:id})

 if(!userexist){
		res.status(404).json({message:"Invalid Link"})
	}

	else if(userexist && userexist.emailverification){
		res.status(404).json({message:"Invalid Link"})
	}


else	if(tokenexist){
		res.status(420).json({message:"Link Already Sended in Email."})
	}



else if(userexist && !tokenexist){
	let sendtoken=new Token({
		userId:userexist.id,
		token:crypto.randomBytes(32).toString("hex")
	})
	await sendtoken.save()

	let linkurl=`${process.env.page_url}api/user/${sendtoken.userId}/verify/${sendtoken.token}`
	mailit(userexist.email,"Email Verification",emailvemailsend(userexist.name.split(" ")[0],linkurl))

res.status(200).json({message:"Please Check Your Email"})
}

else{
res.status(404).json({message:"Invalid Link"})
}
})
 





app.use((req,res)=>{
	res.status(404).sendFile(__dirname+"/error.html")
})



app.listen(process.env.port,(err)=>{
	if (err) throw console.log("port error");
 console.log("server start....At http://127.0.0.1:5000");

})