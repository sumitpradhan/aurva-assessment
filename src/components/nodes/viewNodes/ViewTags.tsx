import { Handle, Position, useReactFlow } from '@xyflow/react'
import  { useEffect } from 'react'
import useCreateEdge from '../../../hooks/useCreateEdge';
import viewIcon from "D:/React-Projects/aurva-assessment/public/open_view.png"
import { viewMealNodeProps } from './ViewDetails';

const ViewTags = ({ data, id } : viewMealNodeProps ) => {

  const { setEdges } = useReactFlow();
  const createEdge = useCreateEdge(data.sourceId , id, setEdges); //custom hook to create edge

  useEffect(() => {
    createEdge();
  },[createEdge]);

  return (
    <>
        <Handle  type='target' position={Position.Left}/>
        <div
        className="bg-white px-6 py-1 rounded-md shadow-md flex gap-2 items-center"
      >
        <div className="w-5 h-5">
          <img
            className="object-scale-down rounded-full w-full h-full"
            alt="view-icon"
            src={viewIcon}
          />
        </div>
        <div className="cursor-pointer">View Tags</div>
      </div>
        <Handle type='source' position={Position.Right}/>
    </>
  )
}

export default ViewTags
