import { getIntrospectionQuery } from "graphql";

function graphQLFetcher() {
  return fetch("http://localhost:7443/graphql", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (responseBody) {
      try {
        return JSON.parse(responseBody);
      } catch (error) {
        return responseBody;
      }
    });
}

export async function getTypes() {
  // Async call to fetch introspection result
  const introspectionSchema = await graphQLFetcher();
  // Dig into the introspection to get types
  const allTypes = introspectionSchema.data.__schema.types;
  return allTypes;
}
