import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
import { mealViewNode } from "../../../constants/constants";
import useCreateEdge from "../../../hooks/useCreateEdge";
import { Meal } from "../viewNodes/ViewMealsNode";
import useCreateNode from "../../../hooks/useCreateNode";

interface mealData{
  sourceId:string,
  mealData:Meal
}
interface mealnodeProps{
  id:string,
  data:mealData
}
const MealNode = ({ data, id}:mealnodeProps) => {
  const { getNode, setNodes, setEdges } = useReactFlow();
  const [disabeClick, setDisableClick] = useState(false);

  const createEdge = useCreateEdge(data.sourceId , id, setEdges);
  useEffect(() => {
    createEdge();
  },[createEdge]);

  const createNodes= useCreateNode(); 

  const handleMealNodeClicked = () => {
    if (disabeClick) return;
    const newNodes = mealViewNode.map((viewType) => {
      return {
        type: viewType,
        data: {
          mealID: data.mealData.idMeal,
        },
      };
    });
    createNodes({parentNodeId:id,newNodes:newNodes,setNodes:setNodes,getNode:getNode});
    setDisableClick(true);
  };

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className="bg-white px-4 py-2 rounded-md flex gap-2 shadow-lg items-center"
        onClick={handleMealNodeClicked}
      >
        <div className="w-10 h-10">
          <img
            className="object-cover rounded-full w-full h-full"
            alt="category-icon"
            src={data.mealData?.strMealThumb}
          />
        </div>

        <div className="cursor-pointer">{data.mealData.strMeal}</div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default MealNode;
