import { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';

const useFetchJokes = (url, NumJokesToGet) => {
  const [data, setData] = useState(() =>
    JSON.parse(sessionStorage.getItem('jokes') || '[]')
  );
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    let jokes = [];
    while (jokes.length < NumJokesToGet) {
      const response = await axios.get(url, {
        headers: { Accept: 'application/json' }
      });
      jokes.push({ id: uuid(), joke: response.data.joke, votes: 0 });
    }
    setData(jokes);
    setLoading(false);
    sessionStorage.setItem('jokes', JSON.stringify(jokes));
  };

  useEffect(() => {
    if (data.length === 0) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, loading, setData];
};
export { useFetchJokes };
