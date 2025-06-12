const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { mongoModel4 } = require("./adminsessionlist")

let mongodb_schema=new mongoose.Schema({	
	profileverification:	{type:Boolean,default:false,require:true},
	emailverification:{type:Boolean,default:false,require:true},
	profile:{type:String,require:true},
	name:{type:String,require:true},
	email:{type:String,require:true},
	password:{type:String,require:true},
	dept:{type:String,require:true},
	passingyear:{type:String,require:true},
	home:{type:String,require:true},
	roomno:{type:String,require:true},
	coords:{type:String,require:true},
	lastupdate:{type:Date,default:Date.now(),require:true},
 time:{type:Date,default:Date.now()},
	facebooklink:{type:String,default:"#"},
	instralink:{type:String,default:"#"},
	linkedinlink:{type:String,default:"#"},
	whatsapplink:{type:String,default:"#"}

})

mongodb_schema.methods.updateadminprofile=async function() {
	try {

		let test =await mongoModel4.findOneAndUpdate({userid:this._id},{
				profile:this.profile,
					profileverification:	this.profileverification,
	emailverification:this.emailverification,
		name:this.name,
			email:this.email,
		dept:this.dept,
		passingyear:this.passingyear,
		home:this.home,
		roomno:this.roomno,
	coords:this.coords,
	lastupdate:this.lastupdate,
 resistertime:this.time,
	facebooklink:this.facebooklink,
	instralink:this.instralink,
	linkedinlink:this.linkedinlink,
	whatsapplink:this.whatsapplink

		})


		return true

	} catch (error) {

		return false
	}
}


let footer=new mongoose.Schema({
	hostellink:{type:String,default:"#"},
 adminemail:{type:String,default:"#"},
	facebooklink:{type:String,default:"#"},
	instralink:{type:String,default:"#"},
	linkedinlink:{type:String,default:"#"},
	youtubelink:{type:String,default:"#"}
})



mongodb_schema.methods.gettoken= async function(){
	try {
		
		return jwt.sign({
			userId:this._id,
				userName:this.name,
					userEmail:this.email,
						userDept:this.dept,
						userPassingyear:this.passingyear,
	userHome:this.home,
	userRoomno:this.roomno
		},
		process.env.jwt_secret_key,
		{
			expiresIn:"30d"
		}
		)

	} catch (error) {
		console.log(error);
		
	}
}

mongodb_schema.methods.gettoken2=function(){
	try {
		
		return jwt.sign({
			userId:this._id
		},
		process.env.jwt_secret_key,
		{
			expiresIn:"1h"
		}
		)

	} catch (error) {
		console.log(error);
		
	}
}


mongodb_schema.methods.gettoken3=function(){
	try {
		
		return jwt.sign({
		profileverification:	this.profileverification,
	emailverification:this.emailverification,
	profile:this.profile,
	userid:this._id,
	name:this.name,
	email:this.email,
	password:this.password,
	dept:this.dept,
	passingyear:this.passingyear,
	home:this.home,
	roomno:this.roomno,
	coords:this.coords,
	lastupdate:this.lastupdate,
 time:this.time,
	facebooklink:this.facebooklink,
	instralink:this.instralink,
	linkedinlink:this.linkedinlink,
	whatsapplink:this.whatsapplink
			
		},
		process.env.jwt_secret_key2,
		{
			expiresIn:"1h"
		}
		)

	} catch (error) {
		console.log(error);
		
	}
}



mongodb_schema.methods.comparePassword=async function(Password){
//console.log(Password);

return bcrypt.compare(Password, this.password)


}



let mongodb_model=mongoose.model("tests",mongodb_schema)
let footer_model=mongoose.model("footer",footer)
module.exports = {mongodb_model,footer_model}