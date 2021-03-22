export const buildSortQuery = (sortNode) => {
  const sortMode = sortNode && sortNode[1];
  const sortDirection = sortNode && sortNode[2];
  const sqlDirection = sortDirection === "asc" ? "ASC" : "DESC";

  switch (sortMode) {
    case "random":
      return ["", `ORDER BY RANDOM() ${sqlDirection}`];
    case "rating":
      return ["", `ORDER BY rating ${sqlDirection}`];
    case "id":
    default:
      return ["", `ORDER BY ID ${sqlDirection}`];
  }
};
