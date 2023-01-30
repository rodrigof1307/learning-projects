import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import LineChart from '../components/Chart';


const Stocks = () => {    
    const [chartData, setChartData] = useState(undefined)
    const [information, setInformation] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const apiKey = process.env.REACT_APP_API_KEY;

    const { state } = useLocation()

    useEffect(() => {
        var axios = require("axios").default

        var options = {
            method: 'GET',
            url: `https://yfapi.net/v8/finance/chart/${state}?range=1mo&interval=1d`,
            params: {modules: 'defaultKeyStatistics,assetProfile'},
            headers: {
                'x-api-key': apiKey
            }
        };

        axios.request(options).then((response) => {
            console.log(response.data.chart.result[0])
            const chartData = {
                labels: response.data.chart.result[0].timestamp.map((elem) => new Date(elem * 1000).toLocaleDateString("en-US")),
                datasets: [
                {
                    label: `${state} close value in the last month`,
                    data: response.data.chart.result[0].indicators.quote[0].close,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderWidth: 5
                }],
            }
            const information = {
                symbol: response.data.chart.result[0].meta.symbol,
                type: response.data.chart.result[0].meta.instrumentType,
                exchange: response.data.chart.result[0].meta.exchangeName,
                regularMarketPrice: response.data.chart.result[0].meta.regularMarketPrice
            }
            setInformation(information)
            setChartData(chartData)
            setLoading(false)

        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    if(loading) {
        return(
            <div className='d-flex flex-grow-1 justify-content-center p-4'>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> 
        )
    }

    return (
        <>
            <div className='d-flex flex-row justify-content-around p-4'>
                <div className='d-flex flex-row justify-content-start'>
                    <p className='fw-semibold me-1'>{information.symbol}</p>
                    <p>{'(' + information.regularMarketPrice + ')'}</p>
                </div>
                <div className='d-flex flex-row justify-content-start'>
                    <p className='fw-semibold me-1'>Exchange: </p>
                    <p>{information.exchange}</p>
                </div>
                <div className='d-flex flex-row justify-content-start'>
                    <p className='fw-semibold me-1'>Type: </p>
                    <p>{information.type[0] + information.type.slice(1).toLowerCase()}</p>
                </div>
            </div>
            <div className='ms-5 me-5 mb-5'>
                <LineChart chartData={chartData} />
            </div>
        </>
    )
}

export default Stocks;