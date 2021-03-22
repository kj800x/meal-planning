const OR_JOINER = " OR ";
const AND_JOINER = " AND ";
const multiArgJoiner = (joiner, fn) => (args) =>
  args.length !== 1 ? "(" + args.map(fn).join(joiner) + ")" : fn(args[0]);

const functions = {
  __IMPLICIT__: multiArgJoiner(AND_JOINER, buildFilterQuery),
  and: multiArgJoiner(AND_JOINER, buildFilterQuery),
  or: multiArgJoiner(OR_JOINER, buildFilterQuery),
  not: (args) =>
    `Recipe.id NOT IN (SELECT id from Recipe WHERE ${buildFilterQuery(
      args[0]
    )})`,
  rating: multiArgJoiner(OR_JOINER, (arg) =>
    arg === "null" ? "rating IS null" : `rating = ${arg}`
  ),
  fulltext: (args) => {
    const pattern = `'%${args.join(" ").replace(/'/g, "\\'")}%'`;
    return `(title LIKE ${pattern} OR \`description\` LIKE ${pattern})`;
  },
  title: (args) => {
    const pattern = `'%${args.join(" ").replace(/'/g, "\\'")}%'`;
    return `title LIKE ${pattern}`;
  },
  desc: (args) => {
    const pattern = `'%${args.join(" ").replace(/'/g, "\\'")}%'`;
    return `\`description\` LIKE ${pattern}`;
  },
};

export function buildFilterQuery(node) {
  const [fn, ...args] = node;

  return functions[fn](args);
}
