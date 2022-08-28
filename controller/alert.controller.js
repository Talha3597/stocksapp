
const Alert =require('../model/alert')
const User =require('../model/user')
const sendEmail =require('../utils/sendEmail');;
require('dotenv').config({path: '../.env'})
exports.addAlert=async (req,res,next)=>
{
   
    const {symbol,trend,change,target,subject,note}=req.body
    let emails=[]

            try {
                const alert =  Alert.create({
                    symbol,trend,change,target,subject,note
                })
               .then(
               User.find({}
                ).then((data)=>{
                    console.log(data)
                    data.map(item => { emails.push(item.email) })
                   
                    sendEmail({
                        to:emails,
                        subject:subject,
                        text:note
                    }) 
                     } )
            
                )
                }
               
             catch (error) {
                
                res.status(200).json({success:false, data:"Not Registered"})
            }
        
   
}
exports.alerts=async(req,res)=>{
    const {search}=req.query
    let arry=[]
    if(search){
         arry=search.split('-')
        await Alert.find({symbol: { $regex: arry[0],'$options' : 'i' },trend:arry[1]}).sort({_id:-1})
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    }
    else{
    await Alert.find({}).sort({_id:-1})
    .then((data)=>{
        
        return res.send(data)})
    .catch( (err)=>{
        return res.status(200).json({success:true, token:'Error Loading Data'})
    })  
}

}
exports.deleteAlert=async(req,res)=>{
    
    const id=req.query.id
  
    await Alert.findByIdAndDelete(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
            
        }
    });

}
