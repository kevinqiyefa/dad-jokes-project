import React from 'react'

function Joke(props) {

    return (
        <div className='Joke'>
            <div className='Joke-buttons'>
                <i className='fas fa-arrow-up' onClick={()=>props.handleVotes(props.id, 1)}></i>
                <span>{props.votes}</span>
                <i className='fas fa-arrow-down' onClick={()=>props.handleVotes(props.id, -1)}></i>
            </div>

            <div className='Joke-text'>
                <span>{props.joke}</span>
            </div>
        </div>
    )
}

export default Joke
