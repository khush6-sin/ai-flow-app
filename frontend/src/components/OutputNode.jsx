import React from "react";
import { Handle, Position } from "reactflow";

const OutputNode = ({ data }) => {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid #ddd",
        borderRadius: 10,
        width: 220,
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h4>Result</h4>

      <textarea
        className="nodrag"
        value={data.response}
        placeholder="response generate..."
        readOnly
        style={{
          width: "90%",
          height: "80px",
          resize: "none",
          overflowY: "auto",
          padding: 6,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />

      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default OutputNode;
