import { Handle, Position, useReactFlow } from '@xyflow/react'

import  { useEffect, useState } from 'react'
import useCreateEdge from '../../../hooks/useCreateEdge';
import { viewMealNodeProps } from '../viewNodes/ViewDetails';

interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}


const colors = ['#D8BFD8', '#FFD700', '#FFA07A', '#FFC0CB'];

const MealDetailNode = ({ data, id }:viewMealNodeProps) => {
  const { setEdges } = useReactFlow();
  console.log(useReactFlow())
  const [mealData,setMealData] =useState<Meal | null>(null);
  const createEdge = useCreateEdge(data.sourceId , id, setEdges); //custom hook to create edge

  useEffect(() => {
    createEdge();
  },[createEdge]);

  
  useEffect(()=>{
    const fetchMealData = async()=>{
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.mealID}`)
      const mealdata = await response.json();
      setMealData(mealdata.meals[0]);
      console.log(mealdata.meals[0])
    }
    fetchMealData();
  },[data.mealID]);

  /*const handleRemoveNode =()=>{
    deleteElements({ nodes: [{ id: id }] });
  }*/
  return (
    <>
       <Handle  type='target' position={Position.Left}/>
       <div className='bg-white p-4 flex flex-col gap-2 shadow-xl min-w-[30%] max-w-[40%]'>   

              <div className='border-b-2 flex justify-between'>
                {mealData?.strMeal}
                <div className='cursor-pointer font-bold text-red-500' >
                  X
                </div>
              </div>   
              <div className=' '>
                 <img className='object-cover rounded-md w-full  h-full' alt="meal-image" src={mealData?.strMealThumb}/>
              </div>

              <div className='flex flex-wrap gap-2'>
                  {mealData?.strTags?.split(",").map((tag ,index)=>{
                       const bg_color=colors[index % colors.length] ;
                        return <div key={tag + index} style={{ backgroundColor: bg_color }} className='rounded-2xl px-3 '>
                                  {tag}
                             </div>
                  })}
              </div>

              <div className='flex flex-col gap-2'>
                      <div className='flex justify-between'>
                          <div className='w-[50%]'>
                            Category
                          </div>
                          <div className='w-[50%]'>
                            {mealData?.strCategory}
                          </div>
                      </div>

                      <div className='flex justify-between'>
                          <div className='w-[50%]'>
                            Area
                          </div>
                          <div className='w-[50%]'>
                            {mealData?.strArea}
                          </div>
                      </div>

                      <div className='flex justify-between'>
                          <div className='w-[50%]'>
                            Youtube
                          </div>
                          <div className='w-[50%] text-wrap '>
                            <a href={mealData?.strYoutube} target="_blank" rel="noopener noreferrer" className="text-black underline break-words">{mealData?.strYoutube}</a>                            
                          </div>
                      </div>

                      <div className='flex justify-between'>
                          <div className='w-[50%]'>
                            Recipe
                          </div>
                          <div className='w-[50%]'>
                          <a href={mealData?.strSource} target="_blank" rel="noopener noreferrer" className="text-black underline break-words">{mealData?.strSource}</a>                            
                            
                          </div>
                      </div>

              </div>
              
              <div className='border-2 p-2 flex flex-col gap-4 '>
                  <div className='font-bold text-gray-600'>
                      Instructions
                  </div>
                  <div className=' text-gray-600 max-h-40 overflow-y-scroll' >
                      {
                      mealData?.strInstructions.split('\r\n').map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                  </div>
              </div>
        </div>
    </>
   
  )
}

export default MealDetailNode
