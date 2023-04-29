import React, { useState, useEffect } from "react";
import axios from "axios";

const SuperHeroes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/superheroes").then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h3>Super Heroes Page</h3>
      {data.map((hero) => {
        return <div>{hero.name}</div>;
      })}
    </>
  );
};
export default SuperHeroes;
