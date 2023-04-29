import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

function fetchSuperhero({ queryKey }) {
  // queryKey is an array of keys. In this case, it will be ["super-hero", heroId]
  return axios.get(`http://localhost:3001/superheroes/${queryKey[1]}`);
}
export const useSuperHeroDetail = (heroId) => {
  const queryClient = useQueryClient();

  return useQuery(["super-hero", heroId], fetchSuperhero, {
    initialData: () => {
      // finding the hero from the existing query data in the cache and returning it as initial data. Once the query is fetched, the cache will be updated with the new data.
      const hero = queryClient
        .getQueryData("superheroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
        // returning undefined will set the query to loading state and prevent the component from rendering that would otherwise result in runtime error.
      }
    },
  });
};
