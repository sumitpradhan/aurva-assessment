import { Handle, Position, useReactFlow } from "@xyflow/react";
import { fetchData } from "../../utils/utils";
import { CATEGORY_API } from "../../constants/constants";
import { useState } from "react";
import useCreateNode from "../../hooks/useCreateNode";


type exploreData ={
  label:string
}
interface ExplorerNodeProps {
  id: string;
  data: exploreData; // Replace 'any' with the specific type if you know it
}
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

//This is the Root Node
const ExplorerNode = ({ data, id } :ExplorerNodeProps) => {
  const { getNode, setNodes} = useReactFlow();
  const [disabeClick, setDisableClick] = useState(false);
  const createNodes= useCreateNode(); 
  
  const handleExploreOpen = async () => {
    if (disabeClick) return;
    let data;
    try{
      const response = await fetchData(CATEGORY_API);
      data = await response.json();
    }
    catch(error){
        console.log(error)
    }

    const newNodes = data.categories.slice(0, 5).map((category:Category) => {
      return {
        type: "category",
        data: {
          categoryData: category,
        },
      };
    });

    createNodes({parentNodeId:id,newNodes:newNodes,setNodes:setNodes,getNode:getNode});

    setDisableClick(true);
  };
  return (
    <>   
        <Handle type="source" position={Position.Right} /> 
        <div
        className="bg-white px-6 py-1 rounded-md shadow-md flex gap-2 items-center"
        onClick={handleExploreOpen}
        >
        
        <div className="w-10 h-10">
          <img
            className="object-cover rounded-full w-full h-full"
            alt="category-icon"
            src="https://pic.onlinewebfonts.com/thumbnails/icons_571745.svg"
          />
        </div>

        <div className="cursor-pointer">{data.label}</div>

      </div>
    </>
  );
};

export default ExplorerNode;
