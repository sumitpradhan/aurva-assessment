import {
  Handle,
  Position,
  useReactFlow
} from "@xyflow/react";
import { useEffect, useState } from "react";
import { Category } from "./ExplorerNode";
import useCreateEdge from "../../hooks/useCreateEdge";
import useCreateNode from "../../hooks/useCreateNode";

type categoryData={
  sourceId: string,
  categoryData: Category,
}
interface CategoryNodeProps {
  id: string;
  data: categoryData; // Replace 'any' with the specific type if you know it
}

const CategoryNode = ({ data, id }:CategoryNodeProps) => {
  const { getNode, setNodes, setEdges } = useReactFlow();
  const [disabeClick, setDisableClick] = useState(false);

  const createEdge = useCreateEdge(data.sourceId , id, setEdges);
  useEffect(() => {
    createEdge();
  },[createEdge]);
 
  const createNodes= useCreateNode(); 

  const handleCategoryClicked = () => {
    if (disabeClick) return;
    const newNode= [];
    newNode.push({
      type: "viewMeal",
      data: {
        mealFilter:"c="+data.categoryData.strCategory,
      },
    })
    createNodes({parentNodeId:id,newNodes:newNode,setNodes:setNodes,getNode:getNode});
    setDisableClick(true);
  };
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className="bg-white px-6 py-1 rounded-md shadow-md flex gap-2 items-center"
        onClick={handleCategoryClicked}
      >
        <div className="w-10 h-10">
          <img
            className="object-cover rounded-full w-full h-full"
            alt="category-icon"
            src={data.categoryData.strCategoryThumb}
          />
        </div>
        <div className="cursor-pointer">{data.categoryData.strCategory}</div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default CategoryNode;
