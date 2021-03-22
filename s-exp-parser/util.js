export function extractFilterNodes(node) {
  if (!Array.isArray(node)) {
    return [node];
  }

  const [fn, ...args] = node;
  if (fn === "sort") {
    // is a sort node
    return [];
  } else {
    return [[fn, ...args.flatMap(extractFilterNodes)]];
  }
}

export function extractSortNode(node) {
  if (!Array.isArray(node)) {
    return null;
  }

  const [fn, ...args] = node;
  if (fn === "sort") {
    return node;
  } else {
    const sortNodes = args.filter(extractSortNode);
    if (sortNodes.length === 0) {
      return null;
    }
    return sortNodes[0];
  }
}

export const asTextNodes = (x) => (x.length ? x.map(asTextNodes) : x.text);
