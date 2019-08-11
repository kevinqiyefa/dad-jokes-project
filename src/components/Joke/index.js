import React from 'react';
import './style.css';

function Joke(props) {

    return (
        <div className='Joke'>
            <div className='Joke-buttons'>
                <i className='fas fa-arrow-up' onClick={()=>props.handleVotes(props.id, 1)}></i>
                <span className='Joke-votes'>{props.votes}</span>
                <i className='fas fa-arrow-down' onClick={()=>props.handleVotes(props.id, -1)}></i>
            </div>

            <div className='Joke-text'>
                <span>{props.joke}</span>
            </div>

            <div className='Joke-smiley'>
                <i class="em em-rolling_on_the_floor_laughing"></i>
            </div>
        </div>
    )
}

export default Joke
