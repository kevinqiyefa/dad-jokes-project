import React from 'react';
import {useFetch} from '../api/FetchData'


function JokeList() {
    
    const [jokes, isLoading] = useFetch('https://icanhazdadjoke.com/');

    const renderJokes = ()=>(jokes.map((j, idx)=>(<div key={idx}>{j}</div>)))

    return (
        <div className='JokeList'>
            <h1>Dad Jokes</h1>
            <div className='JokeList-jokes'>
                {renderJokes()}
            </div>
        </div>
    )
}

export default React.memo(JokeList);