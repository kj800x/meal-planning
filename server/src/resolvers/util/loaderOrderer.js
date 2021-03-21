export function order(data, ordering, orderingKey = "id") {
  return ordering.map((id) => data.find((datum) => datum[orderingKey] === id));
}
