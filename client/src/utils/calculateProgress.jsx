// progressUtils.js
export const calculateProgress = (connections, topRowCount, bottomRowCount) => {
    let totalPossibleConnections = (topRowCount - 1) * (bottomRowCount - 1);
  
    // Adjust for odd total connections
    // if (totalPossibleConnections % 2 !== 0) {
    //   totalPossibleConnections -= 1;
    // }
  
    const verticalEdges = connections.length;
    let progressPercentage = totalPossibleConnections > 2 
      ? (verticalEdges / totalPossibleConnections) * 100 
      : 0;
  
    return Math.min(progressPercentage, 100);
  };
  