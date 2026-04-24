function hasCycle(node, graph, visited, stack) {
  if (stack.has(node)) return true;
  if (visited.has(node)) return false;

  visited.add(node);
  stack.add(node);

  for (let nei of graph.get(node)) {
    if (hasCycle(nei, graph, visited, stack)) return true;
  }

  stack.delete(node);
  return false;
}

module.exports = { hasCycle };