import { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';

const useFetchJokes = (url, NumJokesToGet) => {
  const [data, setData] = useState(() =>
    JSON.parse(sessionStorage.getItem('jokes') || '[]')
  );
  const [loading, setLoading] = useState(false);

  const dataSet = new Set(data.map(j => j.joke));

  const fetchData = async () => {
    setLoading(true);
    let tempJokes = [];
    let count = 0;
    while (count++ < NumJokesToGet) {
      const response = await axios.get(url, {
        headers: { Accept: 'application/json' }
      });

      const newJoke = response.data.joke;
      if (dataSet.has(newJoke)) {
        count--;
      } else {
        dataSet.add(newJoke);
        tempJokes.push({ id: uuid(), joke: newJoke, votes: 0 });
      }
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
