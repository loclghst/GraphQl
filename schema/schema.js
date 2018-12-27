const graphql = require("graphql");
const axios = require("axios");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = graphql;

const users = [
  { id: "23", name: "jhon", age: 20 },
  { id: "42", name: "Jane", age: 21 }
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(response => response.data);
        //we are pulling the data out of response because the data returned by
        //axios is wrappped up as {data:{response}}
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
