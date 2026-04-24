function buildGraph(edges) {
  const graph = new Map();

  for (let edge of edges) {
    const [p, c] = edge.split("->");

    if (!graph.has(p)) graph.set(p, []);
    if (!graph.has(c)) graph.set(c, []);

    graph.get(p).push(c);
  }

  return graph;
}

module.exports = { buildGraph };