function getComponents(graph) {
  const visited = new Set();
  const components = [];

  for (let node of graph.keys()) {
    if (!visited.has(node)) {
      const comp = [];
      dfs(node, graph, visited, comp);
      components.push(comp);
    }
  }

  return components;
}

function dfs(node, graph, visited, comp) {
  visited.add(node);
  comp.push(node);

  for (let nei of graph.get(node)) {
    if (!visited.has(nei)) dfs(nei, graph, visited, comp);
  }

  for (let [n, neighbors] of graph) {
    if (neighbors.includes(node) && !visited.has(n)) {
      dfs(n, graph, visited, comp);
    }
  }
}

module.exports = { getComponents };