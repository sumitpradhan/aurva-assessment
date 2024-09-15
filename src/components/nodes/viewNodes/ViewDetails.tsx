import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
import useCreateEdge from "../../../hooks/useCreateEdge";
import viewIcon from "D:/React-Projects/aurva-assessment/public/open_view.png"
import useCreateNode from "../../../hooks/useCreateNode";


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
  const createNodes= useCreateNode(); 

  useEffect(() => {
    createEdge();
  },[createEdge]);

 

  const handleViewMealDetails = () => {
    if (disabeClick) return;
    const newNodes=[{
      type: "mealDetail",
      data: {
        mealID:data.mealID,
      }
    }]
    createNodes({parentNodeId:id,newNodes:newNodes,setNodes:setNodes,getNode:getNode});
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
