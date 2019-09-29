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
    let tempJokes = [];
    let count = 0;
    while (count++ < NumJokesToGet) {
      const response = await axios.get(url, {
        headers: { Accept: 'application/json' }
      });
      tempJokes.push({ id: uuid(), joke: response.data.joke, votes: 0 });
    }
    setData([...data, ...tempJokes]);
    setLoading(false);
    sessionStorage.setItem('jokes', JSON.stringify([...data, ...tempJokes]));
  };

  useEffect(() => {
    if (data.length === 0) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, loading, setData, fetchData];
};
export { useFetchJokes };
