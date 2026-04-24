import { useState } from "react";

export default function Tree({ data }) {
  return (
    <div className="tree">
      {Object.entries(data).map(([key, value]) => (
        <TreeNode key={key} label={key} childrenData={value} />
      ))}
    </div>
  );
}

function TreeNode({ label, childrenData }) {
  const [open, setOpen] = useState(true);

  const hasChildren = Object.keys(childrenData).length > 0;

  return (
    <div className="tree-node">
      <div className="node-row" onClick={() => setOpen(!open)}>
        {hasChildren && (
          <span className="toggle">
            {open ? "▼" : "▶"}
          </span>
        )}
        <span className="node">{label}</span>
      </div>

      {open && hasChildren && (
        <div className="children">
          <Tree data={childrenData} />
        </div>
      )}
    </div>
  );
}