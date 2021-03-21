import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

export default new GraphQLScalarType({
  name: "Blob",
  description: "Blob as represented by getTime",
  parseValue(value) {
    return new Buffer(...value); // value from the client
  },
  serialize(value) {
    if (value instanceof Buffer) {
      return [...value];
    }
    throw new TypeError(
      `Blob cannot represent a non buffer value: ${value.toString()}`
    );
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.LIST) {
      // console.log(ast);
      throw new Error("TODO Need implements");
    }
    return null;
  },
});
