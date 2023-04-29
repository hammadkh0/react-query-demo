import { request } from "../utils/axios-utils";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const useSuperHeroesData = (onSuccess, onError) => {
  /* 
    -> [superheroes] is the key for the cache. If you change it, it will make a new request.
    -> This cache is stored in the browser's local storage and will persist even if you refresh the page.
    -> When a request is made for the first time, isLoading will be true. When the request is complete, isLoading will be false. Then for the next requests, the cache is checked for the key and if key exists it's data is returned.
  */
  return useQuery(
    ["superheroes"],
    () => {
      return request({ url: "/superheroes" });
    },
    {
      cacheTime: 1000 * 60 * 5, // 5 minutes (by default).
      /*
        -> Default value for cacheTime is 5 minutes. You can change it by passing cacheTime as a second argument to useQuery.
     */
      staleTime: 3000 * 10, // 30 seconds. 0 seconds (by default)
      /*
        -> staleTime is the time after which the cache is considered stale. If request is made within staleTime it will not be fetched from cache or server thus no request is made .If the cache is stale, it will make a new request to the server. Default value is 5 minutes.
    	*/

      refetchOnMount: false, // true (by default). Other options are false and 'always'.
      /*
        -> If you want to make a request when the component is mounted, set refetchOnMount to true. This behaves like a typical useEffect hook.
      */
      refetchOnWindowFocus: false, // true (by default). Other options are false and 'always'.
      /*
         -> If you want to make a request when the window is focused, set refetchOnWindowFocus to true. 
      */

      // POLLING
      refetchInterval: 0, // 2 seconds.
      /*
        -> If you want to make a request at a regular interval, set refetchInterval to true. This does not work when the window is not focused.
      */
      refetchIntervalInBackground: false, //
      /*
      	-> If you want to make a request at a regular interval even when the window is not focused, set refetchIntervalInBackground to true.
    	*/
      enabled: true, // true (by default)
      /*
      	-> If you want to disable the query, set enabled to false. This will not make any request when the component is mounted.
    	*/

      onSuccess: onSuccess,
      /* 
        -> This is a callback function that will be called after successful data fetching. 
      */
      onError: onError,
      /*
        -> This is a callback function that will be called after encountering an error. 
      */

      // select: (data) => data.data.map((hero) => hero.name),
      /*
        -> This is a callback function that will be called after successful data fetching. It will return the data that you want to use in your component. You don't have to use this if you want to use the whole data.
      */
    }
  );
};

// ------------ MUTATIONS ------------
export const useAddSuperheroDataWithMutations = () => {
  // useMutation hook takes a function that will be called when the mutation is triggered.
  const queryClient = useQueryClient();
  return useMutation(
    (superHero) => {
      return axios.post("http://localhost:3001/superheroes", superHero);
    },
    {
      onSuccess: (newData) => {
        // queryClient.invalidateQueries("superheroes");
        /* 
          -> This will invalidate the cache for the key "superheroes" and will make a new GET request when the component is mounted. This is sometimes expensive as a new GET request is made for every mutation. 
        */
        queryClient.setQueryData(["superheroes"], (oldData) => {
          return {
            ...oldData,
            // ...oldData will add all the properties of oldData to the new object.
            data: [...oldData.data, newData.data],
            // data array is the property of oldData that holds all the superheroes data. We are adding the new superhero to the data array.
          };
        });
      },
    }
  );
};

// ------------ OPTIMISTIC UPDATES ------------
export const useAddSuperheroDatOptimistic = () => {
  // useMutation hook takes a function that will be called when the mutation is triggered.
  const queryClient = useQueryClient();
  return useMutation(
    (superHero) => {
      return request({ url: "/superheroes", method: "POST", data: superHero });
    },
    {
      onMutate: async (newHero) => {
        /* 
          (1) it is fired before the mutation is triggered and receives the same variables the mutation function would receive.
        */
        await queryClient.cancelQueries(["superheroes"]);
        /*
          (2) This will cancel any outgoing queries with the same key.
        */

        const previousHeroData = queryClient.getQueryData(["superheroes"]);
        /*
           (3)This will get the previous data from the cache. 
        */

        /* 
          (4) Optimistically update the cache with the new value. 
        */
        queryClient.setQueryData(["superheroes"], (oldData) => {
          return {
            ...oldData,
            // ...oldData will add all the properties of oldData to the new object.
            data: [...oldData.data, { id: oldData?.data?.length + 1, ...newHero }],
            // data array is the property of oldData that holds all the superheroes data. We are adding the new superhero to the data array.
          };
        });

        return {
          previousHeroData,
          /* 
            (5)This will be used to rollBack the cache if the mutation fails.
          */
        };
      },
      onError: (error, hero, context) => {
        /*
          (6) This will be called if the mutation fails.
        */
        queryClient.setQueriesData(["superheroes"], context.previousHeroData);
      },
      onSettled: () => {
        /*
          (7) This will be called if the mutation is either successful or encounters an error.
        */
        queryClient.invalidateQueries(["superheroes"]);
      },
    }
  );
};
