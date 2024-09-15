import { Handle, Position, useReactFlow } from "@xyflow/react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { mealViewNode } from "../../../constants/constants";
import useCreateEdge from "../../../hooks/useCreateEdge";
import { Meal } from "../viewNodes/ViewMealsNode";

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
  const node = getNode(id);

  // Type assertion to ensure node is not undefined
  if (!node) {
    console.error(`Node with id ${id} not found`);
    return null;
  }

  const { position } = node;

  const handleMealNodeClicked = () => {
    if (disabeClick) return;
    const newNodes = mealViewNode.map((viewType, index) => {
      const nano_id = nanoid();
      return {
        id: nano_id,
        type: viewType,
        position: { x: position.x + 300, y: position.y + index * 70 },
        data: {
          sourceId: id,
          mealID: data.mealData.idMeal,
        },
      };
    });
    setNodes(prevNodes => {
      const updatedNodes = [...prevNodes, ...newNodes];
      return updatedNodes;
    });
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

        <div>{data.mealData.strMeal}</div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default MealNode;
