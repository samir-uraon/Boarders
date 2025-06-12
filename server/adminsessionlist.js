const mongoose=require("mongoose")


const mongoSchema3=new mongoose.Schema({
	UserName:{type:String,require:true},
	SessionId:	{type:String,require:true},
	UserId:{type:String,require:true},
	userAgent:{type:String,require:true},
	IP:{type:String,require:true},
	Time:{
		type:String,require:true},
		createdAt:{type:Date,default:Date.now(),expires:"1h"}
})

 
const mongoSchema4=new mongoose.Schema({
	profile:{type:String,require:true},
		profileverification:	{type:Boolean,default:false,require:true},
	emailverification:{type:Boolean,default:false,require:true},
	userid:{type:String,require:true},
	name:{type:String,require:true},
	email:{type:String,require:true},
	dept:{type:String,require:true},
	passingyear:{type:String,require:true},
	home:{type:String,require:true},
	roomno:{type:String,require:true},
	coords:{type:String,require:true},
	lastupdate:{type:Date,require:true},
 resistertime:{type:Date,require:true},
	facebooklink:{type:String,require:true},
	instralink:{type:String,require:true},
	linkedinlink:{type:String,require:true},
	whatsapplink:{type:String,require:true},
	admintime:{type:Date,default:Date.now()},
referenceAdmin:{type:String,require:true},
referenceId:{type:String,require:true}

})

const mongoSchema5=new mongoose.Schema({
	name:{type:String,require:true},
	userid:{type:String,require:true},
password:{type:String,require:true},
time:{type:Date,default:Date.now()}
})


const mongoModel4=mongoose.model("AdminList",mongoSchema4)
const mongoModel3=mongoose.model("AdminSessionsList",mongoSchema3)
const mongoModel5=mongoose.model("AdminPassowrd",mongoSchema5)


module.exports={mongoModel3,mongoModel4,mongoModel5}