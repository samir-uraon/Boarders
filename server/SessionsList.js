const mongoose=require("mongoose")


const mongoSchema2=new mongoose.Schema({
	UserName:{type:String,require:true},
	SessionId:	{type:String,require:true},
	UserId:{type:String,require:true},
	userAgent:{type:String,require:true},
	IP:{type:String,require:true},
	Time:{
		type:String,require:true},
		createdAt:{type:Date,default:Date.now(),expires:"7d"}
})



const mongoModel2=mongoose.model("SessionsList",mongoSchema2)
module.exports=mongoModel2