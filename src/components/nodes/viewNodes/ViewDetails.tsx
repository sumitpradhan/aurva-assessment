import { Handle, Position, useReactFlow } from "@xyflow/react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import useCreateEdge from "../../../hooks/useCreateEdge";
import viewIcon from "D:/React-Projects/aurva-assessment/public/open_view.png"


export interface mealviewData{
  sourceId:string,
  mealID:string
}

export interface viewMealNodeProps{
  id:string
  data:mealviewData
}

const ViewDetails = ({ data, id }:viewMealNodeProps) => {
  const { getNode, setNodes, setEdges } = useReactFlow();
  const [disabeClick, setDisableClick] = useState(false);
  const createEdge = useCreateEdge(data.sourceId , id, setEdges); //custom hook to create edge

  useEffect(() => {
    createEdge();
  },[createEdge]);

  const node = getNode(id);
  if (!node) {
    console.error(`Node with id ${id} not found`);
    return null;
  }
  const position = node.position;

  const handleViewMealDetails = () => {
    if (disabeClick) return;
    setNodes(prevNodes => [
      ...prevNodes,
      {
        id: nanoid(),
        type: "mealDetail",
        position: { x: position.x + 400, y: position.y },
        data: {
          sourceId: id,
          mealID:data.mealID,
        },
      },
    ]);
    setDisableClick(true);
  };
  return (
    <>
      
    <Handle type="target" position={Position.Left} />
    <div
        className="bg-white px-6 py-1 rounded-md shadow-md flex gap-2 items-center"
        onClick={handleViewMealDetails}
      >
        <div className="w-5 h-5">
          <img
            className="object-scale-down rounded-full w-full h-full"
            alt="view-icon"
            src={viewIcon}
          />
        </div>
        <div className="cursor-pointer">View Details</div>
      </div>
    <Handle type="source" position={Position.Right} />
    </>
  );
};

export default ViewDetails;
