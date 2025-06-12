const mongoose=require("mongoose")

let schema=mongoose.Schema({
	userId:{type:mongoose.Types.ObjectId,require:true,unique:true,ref:"newp"},
	token:{type:String,require:true},
	createdAt:{type:Date,default:Date.now(),expires:3600}
})
let Token=mongoose.model("tokens",schema)

module.exports=Token