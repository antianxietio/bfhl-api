function buildTree(node, graph) {
    const children = graph.get(node);
    const obj = {};

    for (let child of children) {
        obj[child] = buildTree(child, graph);
    }

    return obj;
}

module.exports = { buildTree };