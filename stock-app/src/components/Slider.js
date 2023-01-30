// Write your Slider component here
import React, {useState, useEffect} from 'react';

const Slider = () => {
    const [data, setData] = useState([])
    const apiKey = process.env.REACT_APP_API_KEY;
    

    useEffect(() => {
        var axios = require("axios").default

        var options = {
            method: 'GET',
            url: 'https://yfapi.net/v6/finance/quote/marketSummary',
            params: {modules: 'defaultKeyStatistics,assetProfile'},
            headers: {
                'x-api-key': apiKey
            }
        };

        axios.request(options).then((response) => {
            setData(response.data.marketSummaryResponse.result)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])
    
   
    if(data.length > 0)
    return (
        <div className="slider py-3">
            <div className='slider-track'>
                {data.map((item, index) => (
                    <span key={index} className="me-3">
                        <span className='h6 text-primary fw-semibold'>{item.shortName + " "}</span>
                        <span>{item.regularMarketPrice.fmt + " "}</span>
                        <span>{item.regularMarketChange.fmt + " "}</span>
                        <span style={item.regularMarketChange.raw > 0 ? {color: "green"} : {color: "red"}}>{"(" + item.regularMarketChangePercent.fmt + ")"}</span>
                    </span>
                ))}
            </div>
        </div>
        
    );

    return(
        <div className="slider d-flex flex-grow-1 justify-content-center py-3">
            <div className="spinner-border" role="status"/>
        </div>
    )
}

export default Slider;