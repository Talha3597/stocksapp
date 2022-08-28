const nodemailer =require('nodemailer')
require('dotenv').config({path: '../.env'})

const sendEmail=(options)=>{
    
    const transporter = nodemailer.createTransport({
        
        host:'smtp.gmail.com',
        port: 465,
        secure: false,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD,
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