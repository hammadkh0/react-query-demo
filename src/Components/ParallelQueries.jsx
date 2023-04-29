import React from "react";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:3001/superheroes");
};
const fetchFriends = () => {
  return axios.get("http://localhost:3001/friends");
};

const ParallelQueries = () => {
  const { data: superheroes } = useQuery(["superheroes"], fetchSuperHeroes); // aliasing data to superheroes
  const { data: friends } = useQuery(["friends"], fetchFriends); // aliasing data to friends

  // This aliasing will avoid the conflicts of data returned from both useQueries
  return <div>ParallelQueries</div>;
};

export default ParallelQueries;
