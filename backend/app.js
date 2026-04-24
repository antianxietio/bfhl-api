const express = require("express");
const cors = require("cors");

const { processInput, filterMultiParent } = require("./utils/processInput");
const { buildGraph } = require("./utils/graph");
const { getComponents } = require("./utils/components");
const { hasCycle } = require("./utils/cycle");
const { buildTree } = require("./utils/tree");
const { findRoot } = require("./utils/root");
const { getDepth } = require("./utils/depth");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  const { validEdges, invalidEntries, duplicateEdges } = processInput(data);
  const filteredEdges = filterMultiParent(validEdges);

  const graph = buildGraph(filteredEdges);
  const components = getComponents(graph);

  const hierarchies = [];

  let totalTrees = 0;
  let totalCycles = 0;
  let maxDepth = 0;
  let largestTreeRoot = "";

  for (let comp of components) {
    let cycle = false;
    const visited = new Set();
    const stack = new Set();

    for (let node of comp) {
      if (hasCycle(node, graph, visited, stack)) {
        cycle = true;
        break;
      }
    }

    const root = findRoot(comp, filteredEdges);

    if (cycle) {
      totalCycles++;
      hierarchies.push({
        root,
        tree: {},
        has_cycle: true
      });
    } else {
      totalTrees++;

      const tree = buildTree(root, graph);
      const depth = getDepth(root, graph);

      if (depth > maxDepth || (depth === maxDepth && root < largestTreeRoot)) {
        maxDepth = depth;
        largestTreeRoot = root;
      }

      hierarchies.push({
        root,
        tree,
        depth
      });
    }
  }

  res.json({
    user_id: "L B UPPILI_20092005",
    email_id: "lu3733@srmist.edu.in",
    college_roll_number: "RA2311026020005",

    hierarchies,
    invalid_entries: invalidEntries,
    duplicate_edges: duplicateEdges,

    summary: {
      total_trees: totalTrees,
      total_cycles: totalCycles,
      largest_tree_root: largestTreeRoot
    }
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));