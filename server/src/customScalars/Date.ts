import { GraphQLScalarType } from "graphql";

export default new GraphQLScalarType({
  name: "Date",
  description: "Date",
  parseValue(value) {
    return value;
  },
  serialize(value) {
    return value;
  },
  parseLiteral(ast) {
    return ast;
  },
});
