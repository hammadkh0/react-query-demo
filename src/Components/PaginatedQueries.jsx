import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchColors = (pageNum) => {
  return axios.get(`http://localhost:3001/colors?_limit=5&_page=${pageNum}`);
};
const PaginatedQueries = () => {
  const [pageNum, setPageNum] = React.useState(1);
  const { isLoading, isError, error, data } = useQuery(
    ["colors", pageNum],
    () => fetchColors(pageNum),
    {
      keepPreviousData: true,
      /*
        -> keepPreviousData is a boolean flag that tells react-query to keep the previous data in the cache when a new query is made even If the key is different
      */
    }
  );

  if (isLoading) {
    return <h2>Loading.....</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data.data?.map((color) => {
        return (
          <div key={color.id}>
            <h2>
              {color.id}. {color.label}
            </h2>
          </div>
        );
      })}
      <div>
        <button onClick={() => setPageNum((page) => page - 1)} disabled={pageNum === 1}>
          Previous
        </button>
        <button onClick={() => setPageNum((page) => page + 1)} disabled={pageNum === 4}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedQueries;
