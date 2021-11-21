const { sign } = require('jsonwebtoken');
const mangoose = require('mongoose');
const companyProfile = mangoose.Schema(
{
    companyName:{type:String,required:true},
    showroomName:{type:String,required:true},
    cin:{type:String,required:true},
    inc:{type:String,required:true},
    bPancard:{type:String,required:true},
    gst:{type:String},
    bWebsite:{type:String}
})

const bankDetails = mangoose.Schema(
    {
        bankName:{type:String,required:true},
        branchName:{type:String,required:true},
        accountNumber:{type:String,required:true},
        ifsc:{type:String,required:true},
        accountName:{type:String,required:true},
    })
const User = mangoose.Schema(
    {
        uniqueCode:{type:String,required:true},
        name:{type:String,required:true},
        lastname:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        mobile:{type:Number,required:true},
        password:{type:String,required:true},
        usertype:{type:Number,required:true},
        businesstype:{type:String},
        showroomtype:{type:Array},
        companyProfile:[companyProfile],
        bankDetails:[bankDetails]
    },
    {
        collection:'user-data'
    }
)

const model = mangoose.model('userData',User)
module.exports = model;