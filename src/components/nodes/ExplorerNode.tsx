import { Handle, Position, useReactFlow } from "@xyflow/react";
import { nanoid } from "nanoid";
import { fetchData } from "../../utils/utils";
import { CATEGORY_API } from "../../constants/constants";
import { useState } from "react";


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
  const node = getNode(id);
  if (!node) {
    console.error(`Node with id ${id} not found`);
    return null;
  }
  const position = node.position;
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
    const newNodes = data.categories.slice(0, 5).map((category:Category, index :number) => {
      const nano_id = nanoid();
      return {
        id: nano_id,
        type: "category",
        position: { x: position.x + 220, y: position.y + index * 70 },
        data: {
          sourceId: id,
          categoryData: category,
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
