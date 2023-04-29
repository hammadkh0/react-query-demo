import axios from "axios";
import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";

const limit = 5;
const fetchColors = ({ pageParam = 1 }) => {
  // pageParam is the value returned from getNextPageParam
  return axios.get(`http://localhost:3001/colors?_limit=${limit}&_page=${pageParam}`);
};
const InfiniteQueries = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    // -> hasNextPage is a boolean flag that tells react-query if there is a next page to fetch
    fetchNextPage,
    // -> fetchNextPage is a function that fetches the next page of data
    isFetching,
    // -> isFetching is a boolean flag that tells react-query if there is a query currently being fetched
    isFetchingNextPage,
    // -> isFetchingNextPage is a boolean flag that tells react-query if the next page is currently being fetched
  } = useInfiniteQuery(["colors"], ({ pageParam }) => fetchColors({ pageParam }), {
    getNextPageParam: (_lastPage, pages) => {
      // -> getNextPageParam is a function that returns the next page to fetch
      if (pages.length < pages[0].headers["x-total-count"] / limit) {
        // -> pages[0].headers["x-total-count"] is the total number of items in the database that are being fetched
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading.....</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data.pages?.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map((color) => (
                <h3 key={color.id}>
                  {color.id}. {color.label}
                </h3>
              ))}
            </Fragment>
          );
        })}
        <div>
          <button onClick={fetchNextPage} disabled={!hasNextPage}>
            Load more
          </button>
        </div>
      </div>
      <div>{isFetching && !isFetchingNextPage ? <h3>Fetching.....</h3> : null}</div>
    </>
  );
};

export default InfiniteQueries;
