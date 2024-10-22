import React from "react";
import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query
const HELLO_QUERY = gql`
  query {
    hello
  }
`;

export const HelloWorld = () => {
  // Use the useQuery hook to fetch data
  const { loading, error, data } = useQuery(HELLO_QUERY);

  // Handle loading state
  if (loading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>Error: {error.message}</p>;

  // Render the data
  return (
    <div>
      <h1>{data.hello}</h1> {/* Display the fetched data */}
    </div>
  );
};
