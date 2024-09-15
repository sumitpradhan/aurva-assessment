import { Handle, Position, useReactFlow } from "@xyflow/react";
import { nanoid } from "nanoid";
import  { useEffect, useState } from "react";
import { FILTER_API } from "../../../constants/constants";

import viewIcon from "D:/React-Projects/aurva-assessment/public/open_view.png"
import useCreateEdge from "../../../hooks/useCreateEdge";

type viewMealData ={
  sourceId: string,
  mealFilter: string,
}
interface viewMealNodeProp{
  id:string,
  data:viewMealData
}

export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

const ViewMealsNode = ({ data, id }:viewMealNodeProp) => {
  
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

  const handleViewMealNodeClicked = async () => {
    if (disabeClick) return;
    const response = await fetch(
      `${FILTER_API+data.mealFilter}`
    );
    try{
      const mealData = await response.json();
      const newNodes = mealData?.meals.slice(0, 5).map((meal:Meal, index:number) => {
        const nano_id = nanoid();
        console.log(meal)
        return {
          id: nano_id,
          type: "meal",
          position: { x: position.x + 200, y: position.y + index * 70 },
          data: {
            sourceId: id,
            mealData: meal,
          },
        };
      });
  
      setNodes(prevNodes => {
        const updatedNodes = [...prevNodes, ...newNodes];
        return updatedNodes;
      });
      setDisableClick(true);
    }catch(error)
    {
        console.log(error)
    }
    
  };


  return (
    <>
      <Handle type="target" position={Position.Left} />

      <div
        className="bg-white px-6 py-1 rounded-md shadow-md flex gap-2 items-center"
        onClick={handleViewMealNodeClicked}
      >
        <div className="w-5 h-5">
          <img
            className="object-scale-down rounded-full w-full h-full"
            alt="view-icon"
            src={viewIcon}
          />
        </div>
        <div className="cursor-pointer">View Meals</div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default ViewMealsNode;
