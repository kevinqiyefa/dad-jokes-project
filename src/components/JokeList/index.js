import React from 'react';
import {useFetch} from '../../api/FetchData';
import Joke from '../Joke';

import './style.css';


function JokeList() {
    
    const [jokes, isLoading, setJokes] = useFetch('https://icanhazdadjoke.com/');

    const handleVotes = (id, delta) =>{
        setJokes(jokes.map(j=>(
            j.id===id ? {...j, votes: j.votes+delta} : j
        )))
    }

    const renderJokes = () =>(jokes.map((j)=>(<Joke key={j.id} joke={j.joke} votes={j.votes} handleVotes={handleVotes} id={j.id} />)))

    return (
        <div className='JokeList'>
            <div className='JokeList-sidebar'>

                <h1 className='JokeList-title'>
                    <span>Dad</span> Jokes
                </h1>

                <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="happy-face"/>
                <button className='JokeList-getmore'>New Jokes</button>
         
            </div>
            
            <div className='JokeList-jokes'>
                {renderJokes()}
            </div>
        </div>
    )
}

export default React.memo(JokeList);