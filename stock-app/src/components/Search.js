import React from 'react';

const Search = ({searchStringUpdated}) => {

    const searchFunction = (event) => {
        event.preventDefault();
        searchStringUpdated(event.target.value)
    }
    
    return(
        <form className='d-flex flex-row justify-content-between mb-4 px-4' onSubmit={(event) => (event.preventDefault())}>
            <input type="text" className="form-control" name='search' placeholder="Search by Stock Symbol"
            onChange={searchFunction}/>
            <button className='btn btn-primary ms-4' type="submit" >Search</button>
        </form>
    )

}

export default Search