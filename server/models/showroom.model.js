const { sign } = require('jsonwebtoken');
const mangoose = require('mongoose');
const showroomMember = mangoose.Schema(
{
    name:{type:String,required:true},
    mobie:{type:String,required:true},
    email:{type:String,required:true},
    qualification:{type:String,required:true},
    isActive:{type:Number,required:true},
})
const Showroom = mangoose.Schema(
    {
        clientId:{type:String,required:true},
        showroomName:{type:String,required:true},
        address:{type:String,required:true},
        city:{type:String,required:true},
        country:{type:String,required:true},
        pincode:{type:Number},
        isActive:{type:Number,required:true},
        member:[showroomMember]
    },
    {
        collection:'showroom-list'
    }
)
const model = mangoose.model('showroomData',Showroom)
module.exports = model;