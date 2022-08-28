
const mongoose=require('mongoose');

const AlertSchema=mongoose.Schema({
    symbol:{
        type:String,
        required:true,
        trim:true,
        
    }, 
    trend:{
        type:String,
        trim:true,
    },
    change:{
        type:String,
        trim:true,
    },
    targit:{
        type:String,
        trim:true,
    },
    subject:{
        type:String,
        trim:true,
    },
    note:{
        type:String,
        trim:true,
    },
    
   
},
{ timestamps: true });
const Alert=mongoose.model('Alert',AlertSchema);
module.exports=Alert
