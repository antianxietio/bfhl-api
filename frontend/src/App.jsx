import { useState } from "react";
import axios from "axios";
import Tree from "./components/Tree";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const parseInput = (text) => {
    return text
      .split(",")
      .map((x) => x.replace(/"/g, "").trim())
      .filter((x) => x.length > 0);
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const data = parseInput(input);

    const res = await axios.post("https://bfhl-api-uqq1.onrender.com/bfhl", { data });

    setResult(res.data);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>BFHL Hierarchy Builder</h1>

      <textarea
        placeholder="Enter edges: A->B, B->C"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {loading ? "Processing..." : "Submit"}
      </button>

      {result && (
        <>
          <h2>Hierarchies</h2>
          {result.hierarchies.map((h, i) => (
            <div key={i} className="card">
              <h3>Root: {h.root}</h3>

              {h.has_cycle ? (
                <p className="cycle">Cycle Detected</p>
              ) : (
                <>
                  <Tree data={h.tree} />
                  <p>Depth: {h.depth}</p>
                </>
              )}
            </div>
          ))}

          <h2>Summary</h2>
          <p>Trees: {result.summary.total_trees}</p>
          <p>Cycles: {result.summary.total_cycles}</p>
          <p>Largest Root: {result.summary.largest_tree_root}</p>
        </>
      )}
    </div>
  );
}
