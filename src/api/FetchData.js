


import { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4'

const useFetch = url => {

  const NumJokesToGet = 10;

  const [data, setData] = useState(JSON.parse(sessionStorage.getItem("jokes") || "[]"));
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    let jokes = [];
    while (jokes.length < NumJokesToGet) {
      const response = await axios.get(url, { headers: { Accept: 'application/json' } });
      jokes.push({ id: uuid(), joke: response.data.joke, votes: 0 })

    }
    setData(jokes);
    setLoading(false);
    sessionStorage.setItem("jokes", JSON.stringify(jokes));
  };


  useEffect(() => {

    if (data.length === 0) fetchData();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return [data, loading, setData];
};
export { useFetch };