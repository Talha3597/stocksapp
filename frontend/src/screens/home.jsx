import React, { useEffect, useState } from "react"
import axios from "axios"
import Indicators from "./StocksIndicators";

const HomePage = () => {  
    const [equity, setEquity] = useState('IBM')
    const [ stockStats, setStockStats ] = useState({})
        const [ sixMonthData, setSixMonthData ] = useState({})

    useEffect(() => {
      console.log('component mounted')
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${equity}&interval=5min&apikey=${process.env.API_KEY}`
      const monthlyUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${equity}&interval=5min&apikey=${process.env.API_KEY}`
        axios.get(monthlyUrl)
            .then(res => {
                console.log('one month : ', res.data)
                setSixMonthData(Object.values(res.data)[1])
            })

        axios.get(url)
            .then(res => {
              console.log('data : ', res.data)
              setStockStats(Object.values(res.data)[1])
                         })
            .catch(err => console.log('err : ', err))
    }, [])

    

 
    return (
        <>
 <Indicators stockStats={stockStats} sixMonthData={sixMonthData} />
    </>
    )
}

export default HomePage