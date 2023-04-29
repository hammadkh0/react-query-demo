import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

const DynamicParallel = ({ heroIds }) => {
  const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:3001/superheroes/${heroId}`);
  };

  /*
    useQueries is used to fetch multiple queries in parallel when we don't know the number of queries beforehand. 
    -> This is useful when we have a list of items and we want to fetch the details of each item in parallel. and don't want to violate the "rule of hooks".
    -> The rule of hooks says that we can't use hooks inside loops, conditions or nested functions. and each time component renders, the hooks must be called in the same order.
  */
  const queryResults = useQueries(
    // heroIds = [1, 2]. Id of each super hero.
    heroIds.map((heroId) => {
      // we are creating a query for each heroId.
      return {
        queryKey: ["super-hero", heroId],
        queryFn: () => fetchSuperHero(heroId),
      };
    })
  );
  console.log({ queryResults });
  return <div>DynamicParallel</div>;
};

export default DynamicParallel;
