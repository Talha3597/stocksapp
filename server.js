const path =require('path')
const express= require('express');
const morgan=require('morgan');
const cors=require('cors');
const errorHandler = require('./middleware/error')

const app = express();
const Router =require('./routes/routes.js');

require('dotenv').config();
//DB connection
require('./model/db');


app.use(express.json());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));   
}

app.use(cors());




app.use('/api/auth',require('./routes/auth'))
app.use('/api/private',require("./routes/private"))
app.use("/api", Router);

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'./frontend/build')))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'./frontend/build/index.html'))
    })
}
else{
    app.get('/',(req,res)=>{
        res.send("API is running ....")
    })
}

//Error Handler should be last peice of code
app.use(errorHandler)
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
console.log(`server is listening at port ${PORT}`);

});
