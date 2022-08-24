const nodemailer =require('nodemailer')
require('dotenv').config({path: '../.env'})

const sendEmail=(options)=>{
    const data= Email.find({})
    
    const transporter = nodemailer.createTransport({
        service:process.env.EMAIL_SERVICE,
        auth:{
            user:data[0].EMAIL_USERNAME,
            pass:data[0].EMAIL_PASSWORD,
        }
    })

    const mailOptions = {
        from:process.env.EMAIL_USERNAME,
        to:options.to,
        cc:options.cc,
        bcc:options.bcc,
        subject:options.subject,
        html:options.text,
       
    }
     transporter.sendMail(mailOptions,function (err,info)
     {
         if (err) {
             console.log(err)
             
         } else {
             console.log("email send")
         }
     })

}
module.exports= sendEmail