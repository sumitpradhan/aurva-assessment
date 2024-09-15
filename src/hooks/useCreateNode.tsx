import {Node } from "@xyflow/react";
import { nanoid } from "nanoid";
// Define the type for a node's data
interface NodeData {
    [key: string]: any;
  }
  
  // Define the type for a node
  /*interface NodeInterace {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: NodeData;
  }*/
  interface GetNode {
    (id: string): Node | undefined;
  }
  // Define the type for the function parameters
  interface CreateNodesParams {
    parentNodeId: string;
    newNodes: Array<{ type: string; data: NodeData }>;
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    getNode: GetNode;
  }
  
//Hook to create Nodes , this takes parentNodeId so that edges are created , newNodes array 
const useCreateNode = () => {
  
    const createNodes =({parentNodeId,newNodes,setNodes,getNode}:CreateNodesParams)=>{
        const node = getNode(parentNodeId);
        if (!node) {
          console.error(`Node with id ${parentNodeId} not found`);
          return null;
        }

        const position = node.position;

        const childNodes= newNodes.map((newNode,index)=>{
            return {
                id:nanoid(),
                type:newNode.type,
                position: { x: position.x + 300, y: position.y + index * 70 },
                data:{
                    ...newNode.data,
                    sourceId:parentNodeId,
                }
            }
        })

        setNodes((prevNodes) => {
            const updatedNodes = [...prevNodes, ...childNodes];
            return updatedNodes;
          });
    }

    return createNodes;
}

export default useCreateNode
