import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
import useCreateEdge from "../../../hooks/useCreateEdge";
import viewIcon from "D:/React-Projects/aurva-assessment/public/open_view.png"
interface viewIngredientData{
  sourceId:string,
  mealID:string
}
interface viewIngredientNodeProps{
  id:string
  data:viewIngredientData
}

const ViewIngredients = ({ data, id }:viewIngredientNodeProps) => {
  const { setEdges } = useReactFlow();
  const [disabeClick, setDisableClick] = useState(false);
  const createEdge = useCreateEdge(data.sourceId , id, setEdges); //custom hook to create edge

  useEffect(() => {
    createEdge();
  },[createEdge]);

  useEffect(()=>{
    const fetchMealData = async()=>{
    
    }
    fetchMealData();
  },[]);

  const handleGetIngredient =async()=>{
    if (disabeClick) return;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.mealID}`)
    const mealdata = await response.json();
    console.log(mealdata)
    setDisableClick( true);
  }
  return (
    <>
        <Handle  type='target' position={Position.Left}/>
        <div
        className="bg-white px-6 py-1 rounded-md shadow-md flex gap-2 items-center"
         onClick={handleGetIngredient} >
        <div className="w-5 h-5">
          <img
            className="object-scale-down rounded-full w-full h-full"
            alt="view-icon"
            src={viewIcon}
          />
        </div>
        <div className="cursor-pointer">View Ingredients</div>
      </div>
        <Handle type='source' position={Position.Right}/>
    </>
  );
};

export default ViewIngredients;
