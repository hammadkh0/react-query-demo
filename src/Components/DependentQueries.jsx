import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:3001/users/${email}`);
};
const fetchChannelById = (id) => {
  return axios.get(`http://localhost:3001/channels/${id}`);
};

const DependentQueries = ({ email }) => {
  const { data: user } = useQuery(["user", email], () => fetchUserByEmail(email));
  const channelId = user?.data?.channelId;

  console.log("channelId", channelId);
  const { data: channel } = useQuery(["channel", channelId], () => fetchChannelById(channelId), {
    enabled: !!channelId,
  });
  return <div>DependentQueries</div>;
};

export default DependentQueries;
