const path =require('path')
const express= require('express');
const morgan=require('morgan');
const cors=require('cors');
const errorHandler = require('./middleware/error')
const axios = require('axios')

const app = express();
const Router =require('./routes/routes.js');
const cron = require('node-cron')

const {
    asyncForEach,
    checkDailyAlerts,
    checkIntraDayAlerts
} = require('./utils/cron-helper')

const symbols = ['TSLA', 'IBM', 'QQQ', 'SPY', 'MSFT']
const alerts = [
    {
        change: "above",
        range: 300,
        createdAt: "2022-08-26T16:50:21.054Z",
        note: "Shares of the leading electric vehicle (EV) maker Tesla (NASDAQ: TSLA) have seesawed since eclipsing a $1 trillion market capitalization at the end of 2021.",
        subject: "Tesla",
        symbol: "TSLA",
        trend: "Add Data Alert",
        user: "a@a.com",

    },
    {
        change: "below",
        range: 100,
        createdAt: "2022-08-26T16:50:21.054Z",
        note: "Shares of the leading electric vehicle (EV) maker Tesla (NASDAQ: TSLA) have seesawed since eclipsing a $1 trillion market capitalization at the end of 2021.",
        subject: "Tesla",
        symbol: "QQQ",
        trend: "Add Data Alert",
        user: "a@a.com"
    },
    {
        change: "above",
        range: 400,
        createdAt: "2022-08-26T16:50:21.054Z",
        note: "Shares of the leading electric vehicle (EV) maker Tesla (NASDAQ: TSLA) have seesawed since eclipsing a $1 trillion market capitalization at the end of 2021.",
        subject: "Tesla",
        symbol: "QQQ",
        trend: "Add Data Alert",
        user: "a@a.com"
    },
    {
        change: "below",
        range: 250,
        createdAt: "2022-08-26T16:50:21.054Z",
        note: "Shares of the leading electric vehicle (EV) maker Tesla (NASDAQ: TSLA) have seesawed since eclipsing a $1 trillion market capitalization at the end of 2021.",
        subject: "Tesla",
        symbol: "IBM",
        trend: "Add Data Alert",
        user: "a@a.com"
    },
    {
        change: "above",
        range: 350,
        createdAt: "2022-08-26T16:50:21.054Z",
        note: "Shares of the leading electric vehicle (EV) maker Tesla (NASDAQ: TSLA) have seesawed since eclipsing a $1 trillion market capitalization at the end of 2021.",
        subject: "Tesla",
        symbol: "MSFT",
        trend: "Add Data Alert",
        user: "a@a.com"
    },
    {
        change: "above",
        range: 500,
        createdAt: "2022-08-26T16:50:21.054Z",
        note: "Shares of the leading electric vehicle (EV) maker Tesla (NASDAQ: TSLA) have seesawed since eclipsing a $1 trillion market capitalization at the end of 2021.",
        subject: "Tesla",
        symbol: "SPY",
        trend: "Add Data Alert",
        user: "a@a.com"
    },
    {
        change: "contains",
        range: null,
        createdAt: "2022-08-26T16:50:21.054Z",
        note: "Shares of the leading electric vehicle (EV) maker Tesla (NASDAQ: TSLA) have seesawed since eclipsing a $1 trillion market capitalization at the end of 2021.",
        subject: "Tesla",
        symbol: "TSLA",
        trend: "Add Data Alert",
        user: "a@a.com"
    },
]

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


cron.schedule("*/3 * * * *", async () => {
    console.log('cron job running every minute')
    asyncForEach(symbols, async (symbol) => {
        await checkDailyAlerts(symbol)
    })
    
})

cron.schedule("*/7 * * * *", async () => {
    console.log('intra cron job running every minute')
    asyncForEach(symbols, async (symbol) => {
        await checkIntraDayAlerts(symbol)

    })
    
})

//Error Handler should be last peice of code
app.use(errorHandler)
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
console.log(`server is listening at port ${PORT}`);

});
