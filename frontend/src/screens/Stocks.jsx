// import React from 'react'

// const stocks = () => {
//   return (
//     <div>stocks</div>
//   )
// }

// export default stocks




import React ,{useState,useEffect} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer';
import { useParams } from 'react-router-dom';
import Indicators from './StocksIndicators'
import logoutHandler from '../components/logout';
import Home from './home'
const Stocks =()=>{
  
  
     const [data,setData]=useState([])
     const pushData=[]
     const {ticker}=useParams()
     useEffect(()=>{
      const config= {
          headers:{
              
              Authorization:`Bearer ${localStorage.getItem("authToken")}`,
              role:localStorage.getItem("role")
          }
     }
      let id=localStorage.id
      axios.get('/api/auth/user',{ params: {id,config} },)
          .then(res=>{
             console.log('yes')
          })
          .catch((err)=>{
               logoutHandler()
          }
          )
         
  
  },[]
  )
  
  useEffect(()=>{
    
    if(ticker){
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${process.env.API_KEY}`;
   

      axios.get(API_Call)
      .then((data)=>{
          let num=0
         console.log( Object.keys(data.data['Time Series (Daily)']).length)
          for (var key in data.data['Time Series (Daily)']) {
         
         pushData.push(data.data['Time Series (Daily)'][key])
         pushData[num]['9. date']=key
         num=num+1
        }
          // console.log(stockChartXValuesFunction);
         setData(pushData)

        },
       
      )}
      else{
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${process.env.API_KEY}`;
        
    
      axios.get(API_Call)
      .then((data)=>{
          let num=0

          for (var key in data.data['Time Series (Daily)']) {
         
         pushData.push(data.data['Time Series (Daily)'][key])
         pushData[num]['9. date']=key
         num=num+1
        }
          // console.log(stockChartXValuesFunction);
         setData(pushData)

        },
       
      )
      }
  },[])
 


  return(
    <> 
    <FormContainer sx='12' md='12'> 
    {ticker ? <h1>{ticker}</h1>:<h1>IBM</h1>}
   {data ?
    <LineChart
      width={1000}
      height={600}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis  dataKey="9. date" />
      <YAxis type="number" domain={[1000, 'dataMax + 10']}/>
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="1. open" stroke="black"   />
      <Line type="monotone" dataKey="2. high" stroke="purple"  />
      <Line type="monotone" dataKey="3. low" stroke="red" />
      <Line type="monotone" dataKey="4. close" stroke="green" />
    </LineChart>:<Loader/>}
    </FormContainer>
    <Home/>
  </>
 )
  
}



export default Stocks