import React from "react";
import { Handle, Position } from "reactflow";

const InputNode = ({ data }) => {
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
      <h4>Input</h4>

      <textarea
        className="nodrag"
        value={data.prompt}
        onChange={(e) => data.onChange(e.target.value)}
        placeholder="Enter your prompt..."
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

      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default InputNode;
