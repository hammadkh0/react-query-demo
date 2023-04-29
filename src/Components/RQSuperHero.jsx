import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroDetail } from "../hooks/useSuperHeroDetail";

const RQSuperHero = () => {
  const { heroId } = useParams();
  const { isLoading, data, isError, error } = useSuperHeroDetail(heroId);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data?.data.name} - {data?.data.alter_ego}
    </div>
  );
};

export default RQSuperHero;
