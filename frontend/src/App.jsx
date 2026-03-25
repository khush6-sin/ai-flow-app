import React, { useState, useCallback } from "react";
import ReactFlow, { Background, Controls, applyNodeChanges } from "reactflow";
import "reactflow/dist/style.css";
import Toast from "./components/Toast";
import InputNode from "./components/InputNode";
import OutputNode from "./components/OutputNode";

const nodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
};

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "inputNode",
      position: { x: 100, y: 100 },
      data: {
        prompt: "",
        onChange: setPrompt,
      },
    },
    {
      id: "2",
      type: "outputNode",
      position: { x: 400, y: 100 },
      data: {
        response: "",
      },
    },
  ]);

  const edges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
    },
  ];

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const runFlow = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.answer);

      // update node data
      setNodes((nds) =>
        nds.map((node) =>
          node.id === "2" ? { ...node, data: { response: data.answer } } : node,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes.map((node) => {
          if (node.id === "1") {
            return {
              ...node,
              data: { prompt, onChange: setPrompt },
            };
          }
          if (node.id === "2") {
            return {
              ...node,
              data: { response },
            };
          }
          return node;
        })}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      <Toast message={toastMsg} />

      <button
        onClick={runFlow}
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-60%)",
          padding: "12px 24px",
          borderRadius: 8,
          border: "none",
          background: "#4CAF50",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Run Flow
      </button>

      <button
        onClick={async () => {
          try {
            await fetch("http://localhost:8000/api/save", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ prompt, response }),
            });

            setToastMsg("Saved");
            setTimeout(() => setToastMsg(""), 2000);
          } catch (error) {
            console.error(error);
          }
        }}
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(60%)",
          padding: "12px 24px",
          borderRadius: 8,
          border: "none",
          background: "#2196F3",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Save
      </button>
    </div>
  );
}

export default App;
