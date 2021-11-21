const express = require('express');
const app = express();
const mangoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user.model');
const showroomName = require('./models/showroom.model')
const ShowRoomMember = require('./models/showroom.member.model')
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.json());
var nodemailer = require('nodemailer');

mangoose.connect('mongodb://localhost:27017/finayoloan');
app.post('/api/register',async(req,res)=>{
    console.log(req.body);
    
    try {
        let uniqueCode = (new Date()).getTime().toString(36);
        const user = await User.create({
            uniqueCode : uniqueCode,
            name:req.body.name,
            lastname:req.body.lastname,
            email:req.body.email,
            mobile:req.body.mobile,
            password:req.body.password,
            usertype:1,
            businesstype : '',
            showroomtype : ''
        })
        const token = jwt.sign(
            {
                id:user._id,
                usertype:user.usertype
            }
            ,'secretfinayo1234'
        ) 
        res.json({status:'ok',token:token})
    } catch (error) {
        console.log(error);
        res.json({status:'error',error:'Duplicate email id'})
    }
    
})

app.post('/api/login',async(req,res)=>{
    console.log(req.body);
    const user = await User.findOne({
        email:req.body.email,
        password:req.body.password,
    })
    if(user) {  
        const token = jwt.sign(
            {
                id:user.id,
                name:user.name,
                email:user.email,
                dealername:user.dealername,
                usertype:user.usertype
            }
            ,'secretfinayo1234',
            { expiresIn: '1200s' }
        ) 
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kamalakantadash@gmail.com',
                pass: 'Radhamani$1'
            }
        });
        let otp = (new Date()).getTime().toString(36);
        var mailOptions = {
            from: 'admin@finayo.club',
            to: 'webpintoo@gmail.com',
            subject: 'Finayo - Landing platfom user login otp',
            text: 'Hello Dear! /n your otp is - '+otp
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.json({status:'ok',user:token,otp:otp})
                
            }
        });
        console.log(user)
        //res.json({status:'ok',user:token});
        }
    else  {  
        res.json({status:'error',user:false});
    }
})

app.get('/api/quote',async(req,res)=>{
    const token = req.headers['x-access-token'];
    console.log(token);
    try{
        
        const decoded = await jwt.verify(token,'secretfinayo1234');
        const id = decoded.id;
        const user = await User.findOne({_id:id});
        res.json({status:'ok',name:user});
    }
    catch(err) {
        console.log(err);
        res.json({status:'error',error:'Invalid token'})
    } 
})

app.post('/api/registationupdateprofile',async(req,res)=>{
    
    
    console.log(req.body);
    
    try{
        const token = req.headers['x-access-token'];
        //console.log(token);
        const decoded = await jwt.verify(token,'secretfinayo1234');
        console.log(decoded);
        const id = decoded.id;
        var myquery = { _id: id };
        var newvalues = { $set: {businesstype : 'car showroom',showroomtype : req.body.showroomType} };
        const user = await User.updateOne(myquery, newvalues)
        console.log(user);
       //update({_id:new ObjectID(id)}, {"businesstype" : req.body.businessType, "showroomtype" : req.body.showroomType}, {upsert:true})
        /* const user1 = await User.find({_id:id});
        console.log(user1); */
        res.json({status:'ok',data:user});
    }
    catch(err) {
        console.log(err);
        res.json({status:'error',error:'Invalid token'})
    } 
})

/** Showroom API*/
app.get('/api/displayShowroom',async(req,res) =>{
    const token = req.headers['x-access-token'];
    console.log(token);
    try{
        const decoded = await jwt.verify(token,'secretfinayo1234');
        const clientId = decoded.id;
        /* const remove = await showroomName.remove({});
        console.log("------------"+remove); */

        /* showroomName.find().forEach(
            function (newBook) {
                newBook.employee = ShowRoomMember.findOne( { "showroomId": newBook._id } );
                booksReloaded.insert(newBook);
            }
        );
        booksReloaded.find().pretty(); */

        

        const user = await showroomName.find({clientId:clientId});
        res.json({status:'ok',data:user});
    }
    catch(err) {
        //console.log(err);
        res.json({status:'error',error:'Invalid token'})
    }
})
app.post('/api/addShowroom',async(req,res)=>{
    console.log(req.body);
    
    try {

       /*  const remove = showroomName.remove({});
        console.log(remove); */
        const token = req.headers['x-access-token'];
        const decoded = await jwt.verify(token,'secretfinayo1234');
        console.log(decoded);
        const clientId = decoded.id;
        console.log("---------" +clientId);
        const showroomResult = await showroomName.create({
            clientId:clientId,
            showroomName:req.body.showroom,
            address:req.body.address,
            city:req.body.city,
            country:req.body.country,
            pincode:(req.body.pincode) ?req.body.pincode:'',
            liceseNo:(req.body.license)?req.body.license:'',
            isActive:1
        })

        console.log(showroomResult);
        res.json({status:'ok',error:''})
    } catch (error) {
        console.log(error);
        res.json({status:'error',error:'Invalid Token'})
    }
    
})

app.post('/api/addShowroomMember',async(req,res) => {
    //ShowRoomMember
    try {

        /*  const remove = showroomName.remove({});
         console.log(remove); */
         const token = req.headers['x-access-token'];
         const decoded = await jwt.verify(token,'secretfinayo1234');
         console.log(decoded);
         const clientId = decoded.id;
         console.log("---------" +clientId);
        /*  const showroomResult = await ShowRoomMember.create({
            showroomId:req.body.memberShowroom,
            name:req.body.employee,
            mobie:req.body.mobile,
            email:req.body.email,
            qualification:req.body.qualification,
            isActive:1,
         }) */
         console.log("req.body.memberShowroom = "+req.body.memberShowroom);
         const showroomMemebeInsert = await showroomName.findOne({_id:req.body.memberShowroom})
         .then(function(record){
             console.log("---------- 196"+req.body.employee);
             record.member.push({
                name:req.body.employee,
                mobie:req.body.mobile,
                email:req.body.email,
                qualification:req.body.qualification,
                isActive:1  
             })
             record.save().then(function(){
                const user = showroomName.find({_id:req.body.memberShowroom}).then(function(record){
                    console.log(record);
                });
                console.log(user);
             })
         })
         //console.log(showroomMemebeInsert);
        
         //console.log(user);
         res.json({status:'ok',error:''})
     } catch (error) {
         console.log(error);
         res.json({status:'error',error:'Invalid Token'})
     }
})

app.post('/api/addCompanyProfile',async(req,res) => {
    try {

        const token = req.headers['x-access-token'];
        const decoded = await jwt.verify(token,'secretfinayo1234');
        console.log(decoded);
        const clientId = decoded.id;
        console.log("---------" +clientId);
        const showroomMemebeInsert = await User.findOne({_id:clientId})
        .then(function(record){
            if(record.companyProfile.length > 0) {
                record.companyProfile[0].companyName = req.body.cname;
                record.companyProfile[0].showroomName = req.body.showroomName;
                record.companyProfile[0].cin = req.body.cin;
                record.companyProfile[0].inc = req.body.inc;
                record.companyProfile[0].bPancard = req.body.bPancard;
                record.companyProfile[0].gst = req.body.gst;
                record.companyProfile[0].bWebsite = req.body.bWebsite;
                record.save();
            }
            else {
                record.companyProfile.push({
                    companyName:req.body.cname,
                    showroomName:req.body.showroomName,
                    cin:req.body.cin,
                    inc:req.body.inc,
                    bPancard:req.body.bPancard,
                    gst:req.body.gst,
                    bWebsite:req.body.bWebsite
                })
                 record.save();
            }
        })
        res.json({status:'ok',error:''})
     } catch (error) {
         console.log(error);
         res.json({status:'error',error:'Invalid Token'})
     }
})
app.post('/api/addBankDetail',async(req,res) => {
    try {

        const token = req.headers['x-access-token'];
        const decoded = await jwt.verify(token,'secretfinayo1234');
        console.log(decoded);
        const clientId = decoded.id;
        console.log("---------" +clientId);
        const showroomMemebeInsert = await User.findOne({_id:clientId})
        .then(function(record){
            console.log(req.body);
            if(record.bankDetails.length > 0) {
                record.bankDetails[0].bankName = req.body.bankName;
                record.bankDetails[0].branchName = req.body.branchName;
                record.bankDetails[0].accountNumber = req.body.accountNumber;
                record.bankDetails[0].ifsc = req.body.ifsc;
                record.bankDetails[0].accountName = req.body.accountName;
                record.save();
            }
            else {
                record.bankDetails.push({
                    bankName:req.body.bankName,
                    branchName:req.body.branchName,
                    accountNumber:req.body.accountNumber,
                    ifsc:req.body.ifsc,
                    accountName:req.body.accountName
                })
                record.save();
            }
        })
        res.json({status:'ok',error:''})
     } catch (error) {
         console.log(error);
         res.json({status:'error',error:'Invalid Token'})
     }
})
app.listen('1337',()=>{
    console.log("running on port 1337")
});