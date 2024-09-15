import { Handle, Position } from "@xyflow/react";

const IngredientNode = () => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className="bg-white px-4 py-2 rounded-md flex gap-2 shadow-lg"
      >
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  )
}

export default IngredientNode
