function findRoot(component, edges) {
    const children = new Set();

    for (let edge of edges) {
        const [p, c] = edge.split("->");
        if (component.includes(c)) children.add(c);
    }

    let roots = component.filter(n => !children.has(n));

    if (roots.length === 0) {
        return component.sort()[0];
    }

    return roots.sort()[0];
}

module.exports = { findRoot };