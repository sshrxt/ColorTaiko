import React from 'react';

const calculateMidpointAndTangent = (sourceX, sourceY, controlX, controlY, targetX, targetY) => {
  const t = 0.5;
  const midX = Math.pow(1 - t, 2) * sourceX + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * targetX;
  const midY = Math.pow(1 - t, 2) * sourceY + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * targetY;

  const tangentX = 2 * (1 - t) * (controlX - sourceX) + 2 * t * (targetX - controlX);
  const tangentY = 2 * (1 - t) * (controlY - sourceY) + 2 * t * (targetY - controlY);

  const angle = Math.atan2(tangentY, tangentX) * (180 / Math.PI);

  return { midX, midY, angle };
};

const LargeArcEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  data
}) => {
  const isTopLine = data.isTopLine;
  console.log('the top line is ', isTopLine);
  console.log('the pos is ',sourceX, sourceY, targetX, targetY);

  const horizontalDistance = targetX - sourceX;
  const verticalDistance = Math.abs(targetY - sourceY);
  const controlX = (sourceX + targetX) / 2;
  let controlY;
  if (isTopLine) {
    controlY = Math.min(sourceY, targetY) - Math.max(50, verticalDistance / 3);
  } else {
    controlY = Math.max(sourceY, targetY) + Math.max(50, verticalDistance / 3);
  }
  const { midX, midY, angle } = calculateMidpointAndTangent(sourceX, sourceY, controlX, controlY, targetX, targetY);

  const edgePath = `M${sourceX},${sourceY} Q ${controlX},${controlY} ${targetX},${targetY}`;

  const arrowWidth = 25;  
  const arrowLength = 40; 
  const arrowPath = `M 0,0 L ${arrowLength},${arrowWidth / 2} L ${arrowLength - arrowWidth / 2},0 L ${arrowLength},${-arrowWidth / 2} Z`;

  return (
    <g>
      <path d={edgePath} style={style} fill="none" />
      <g transform={`translate(${midX},${midY}) rotate(${angle})`}>
        <path d={arrowPath} fill={style.stroke || 'black'} />
      </g>
    </g>
  );
};

export default LargeArcEdge;