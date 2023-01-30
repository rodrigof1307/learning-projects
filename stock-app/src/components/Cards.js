import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cards = ({searchString}) => {
    const [data, setData] = useState([])
    const apiKey = process.env.REACT_APP_API_KEY;

    const filterFunction = (item) => (!searchString || item.symbol.toLowerCase().startsWith(searchString.toLowerCase()))

    useEffect(() => {
        var axios = require("axios").default

        var options = {
            method: 'GET',
            url: 'https://yfapi.net/v1/finance/trending/US',
            params: {modules: 'defaultKeyStatistics,assetProfile'},
            headers: {
                'x-api-key': apiKey
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data.finance.result[0].quotes)
            setData(response.data.finance.result[0].quotes)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    if(data.length > 0) {
        return(
            <div className='d-flex flex-column justify-content-start'>
                <h3 className='text-center pb-3' >Trending Indexes</h3>
                <div className='d-flex flex-grow-1 flex-wrap justify-content-start cards'>
                    {data.filter(filterFunction).map((item) => (
                        <Card symbol={item.symbol}/>
                    ))}
                </div>
            </div>
        )
    }

    return(
        <div className='d-flex flex-grow-1 justify-content-center'>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div> 
    )

    
}

const Card = ({symbol}) => {
    const navigate = useNavigate();

    return (
        <div className='card-body text-center border border-primary single-card rounded' key={symbol}>
            <p className='card-title p-3'>{symbol}</p>
            <button className="btn btn-outline-primary my-3" onClick={() => navigate(`/stocks/:${symbol}`, { state: symbol})}>View Details</button>
        </div>
    )
}

export default Cards