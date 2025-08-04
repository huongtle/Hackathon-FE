const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

export class GraphQLClient {
  static async request(query, variables = {}) {
    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        console.error('GraphQL errors:', result.errors);
        throw new Error('GraphQL error');
      }

      return result.data;
    } catch (error) {
      console.error('GraphQL fetch error:', error);
      throw error;
    }
  }
}