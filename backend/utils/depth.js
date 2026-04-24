function getDepth(node, graph) {
    const children = graph.get(node);

    if (!children || children.length === 0) return 1;

    let max = 0;

    for (let child of children) {
        max = Math.max(max, getDepth(child, graph));
    }

    return max + 1;
}

module.exports = { getDepth };