import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest, NextResponse } from "next/server";

// Defining the GraphQL schema
const typeDefs = gql`
  type Query {
    greeting: String
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    greeting: () => "Hello from GraphQL in Next.js!",
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => ({ req }),
});

export { handler as GET, handler as POST };
