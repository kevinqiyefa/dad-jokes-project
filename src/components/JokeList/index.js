import React from 'react';
import { useFetchJokes } from '../../api/FetchData';
import Joke from '../Joke';
import Loader from '../Loader';

import './style.css';

function JokeList() {
  const [jokes, isLoading, setJokes, fetchJokes] = useFetchJokes(
    'https://icanhazdadjoke.com/',
    10
  );

  const happyFaceURL =
    'https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg';

  const handleVotes = (id, delta) => {
    const newJokes = jokes.map(j =>
      j.id === id ? { ...j, votes: j.votes + delta } : j
    );
    setJokes(newJokes);
    sessionStorage.setItem('jokes', JSON.stringify(newJokes));
  };

  let sortedJokes = jokes.sort((a, b) => b.votes - a.votes);

  const renderJokes = () =>
    sortedJokes.map(j => (
      <Joke
        key={j.id}
        joke={j.joke}
        votes={j.votes}
        handleVotes={handleVotes}
        id={j.id}
      />
    ));

  if (jokes.length && isLoading) {
    return (
      <div className="JokeList-spinner">
        <i className="far fa-5x fa-laugh fa-spin" />
        <h1 className="JokeList-title">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="JokeList">
      <div className="JokeList-sidebar">
        <h1 className="JokeList-title">
          <span>Dad</span> Jokes
        </h1>

        <img src={happyFaceURL} alt="happy-face" />
        <button className="JokeList-getmore" onClick={fetchJokes}>
          Fetch Jokes
        </button>
      </div>

      <div className="JokeList-jokes">
        {isLoading ? (
          <div className="Joke-Loader">
            <Loader />
          </div>
        ) : (
          renderJokes()
        )}
      </div>
    </div>
  );
}

export default React.memo(JokeList);
