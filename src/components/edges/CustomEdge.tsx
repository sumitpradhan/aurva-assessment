import { EdgeProps, getBezierPath } from '@xyflow/react';
import React from 'react';

//This is a Custom Edge , this type is added in the edge type constant in constant.js file
const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  animated
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <g className={`react-flow__edge ${animated ? 'animate-wiggle' : ''}`}>
      <path
        id={id}
        className="react-flow__edge-path stroke-current text-blue-200"
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
      />
    </g>
  );
};

export default CustomEdge;
