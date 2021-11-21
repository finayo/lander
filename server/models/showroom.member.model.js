const { sign } = require('jsonwebtoken');
const mangoose = require('mongoose');
const showoomMember = mangoose.Schema(
    {
        clientId:{type:String,required:true},
        showroomId:{type:String,required:true},
        name:{type:String,required:true},
        mobie:{type:String,required:true},
        email:{type:String,required:true},
        qualification:{type:String,required:true},
        isActive:{type:Number,required:true},
    },
    {
        collection:'showroom-member-data'
    }
)

const model = mangoose.model('showoomMember',showoomMember)
module.exports = model;