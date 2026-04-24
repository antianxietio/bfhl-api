function isValidEdge(edge) {
  const regex = /^[A-Z]->[A-Z]$/;

  if (!regex.test(edge)) return false;

  const [parent, child] = edge.split("->");

  if (parent === child) return false;

  return true;
}

function processInput(data) {
  const validEdges = [];
  const invalidEntries = [];
  const duplicateEdges = [];

  const seen = new Set();
  const duplicateTracker = new Set();

  for (let raw of data) {
    const trimmed = raw.trim();

    if (!isValidEdge(trimmed)) {
      invalidEntries.push(raw); 
      continue;
    }

    if (seen.has(trimmed)) {
      if (!duplicateTracker.has(trimmed)) {
        duplicateEdges.push(trimmed);
        duplicateTracker.add(trimmed);
      }
      continue;
    }

    seen.add(trimmed);
    validEdges.push(trimmed);
  }

  return { validEdges, invalidEntries, duplicateEdges };
}

function filterMultiParent(edges) {
  const parentMap = new Map();
  const result = [];

  for (let edge of edges) {
    const [parent, child] = edge.split("->");

    if (!parentMap.has(child)) {
      parentMap.set(child, parent);
      result.push(edge);
    }
  }

  return result;
}

module.exports = { processInput, filterMultiParent };