import { Edge, MarkerType } from "@xyflow/react";
import { nanoid } from "nanoid";



const useCreateEdge = ( sourceId: string,
    targetId: string,
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>) => {

    const createEdge=()=>{
        setEdges(prevEdges => [
            ...prevEdges,
            {
              id: nanoid(),
              source: sourceId,
              target: targetId,
              markerEnd: { type: MarkerType.ArrowClosed },
              type: 'custom',
              animated:true
            },
          ]);
    }

    return createEdge;
}

export default useCreateEdge
