import React from "react";
import {
  useAddSuperheroDatOptimistic,
  useAddSuperheroDataWithMutations,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

const onSuccess = (data) => {
  console.log("Perform side effects after successful data fetching.", data);
};
const onError = (error) => {
  console.log("Perform side effects after encountering an error.", error);
};

const RQSuperheroes = () => {
  const [name, setName] = React.useState("");
  const [alterEgo, setAlterEgo] = React.useState("");
  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );
  const {
    mutate: addHero,
    isLoading: isMutateLoading,
    isError: isMutateError,
    error: mutateError,
  } = useAddSuperheroDatOptimistic();

  const handleAddHero = () => {
    console.log({ name, alterEgo });
    // addHero wil take the user data and pass it to the useMutation hook.
    addHero({ name, alter_ego: alterEgo });
  };

  console.log({ isLoading, isFetching });
  // isFetching is true when the data is being fetched from the cache or from the server. it might have data from earlier request or not.

  // isLoading is true when query is loading for first time and then it's false. It's not true when data is being fetched from cache.
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h3>RQSuperheroes</h3>
      <div>
        <input
          type="text"
          name="superhero"
          value={name}
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="alterEgo"
          value={alterEgo}
          id="alterEgo"
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHero}>Add Hero</button>
      </div>
      <button
        onClick={() => {
          // 1) first set enabled to false to disable automatic fetching on mounting component.
          // 2) then call the refech function to make a request. All the options passed to useQuery will be applied to this request.
          refetch();
        }}
      >
        Fetch Heroes
      </button>
      {/* Use this if you are not using select in the useQuery */}
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}

      {/* Use this if you are using select in the useQuery */}
      {/* {data?.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </div>
  );
};

export default RQSuperheroes;
