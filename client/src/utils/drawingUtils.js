/**
 * Draws connection lines and curved paths between nodes on an SVG canvas.
 * @param {Object} svgRef - Reference to the SVG element where connections will be drawn.
 * @param {Array} connections - Array of individual connections to be drawn as straight lines.
 * @param {Array} connectionPairs - Array of connection pairs to be drawn with curved paths.
 * @param {number} offset - Distance to offset connection lines from node centers.
 */
export const drawConnections = (svgRef, connections, connectionPairs, offset) => {
  if (!svgRef.current) return;

  // Clear existing connections by removing all child elements of the SVG
  while (svgRef.current.firstChild) {
    svgRef.current.removeChild(svgRef.current.firstChild);
  }

  // Retrieve SVG container dimensions to calculate relative node positions
  const svgRect = svgRef.current.getBoundingClientRect();

  /**
   * Adjusts start and end points of a line to offset from node centers.
   * @param {number} x1 - X-coordinate of the starting point.
   * @param {number} y1 - Y-coordinate of the starting point.
   * @param {number} x2 - X-coordinate of the ending point.
   * @param {number} y2 - Y-coordinate of the ending point.
   * @param {number} distance - Offset distance from the center.
   * @returns {Object} Adjusted coordinates {x, y}.
   */
  const adjustPoint = (x1, y1, x2, y2, distance) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const scale = (len - distance) / len;
    return {
      x: x1 + dx * scale,
      y: y1 + dy * scale,
    };
  };

  // Draw individual connections as straight lines
  connections.forEach(({ nodes: [start, end], color }) => {
    const startElement = document.getElementById(start);
    const endElement = document.getElementById(end);

    if (startElement && endElement) {
      const startRect = startElement.getBoundingClientRect();
      const endRect = endElement.getBoundingClientRect();

      let startX = startRect.left + startRect.width / 2 - svgRect.left;
      let startY = startRect.top + startRect.height / 2 - svgRect.top;
      let endX = endRect.left + endRect.width / 2 - svgRect.left;
      let endY = endRect.top + endRect.height / 2 - svgRect.top;

      const adjustedStart = adjustPoint(startX, startY, endX, endY, offset);
      const adjustedEnd = adjustPoint(endX, endY, startX, startY, offset);

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", adjustedStart.x);
      line.setAttribute("y1", adjustedStart.y);
      line.setAttribute("x2", adjustedEnd.x);
      line.setAttribute("y2", adjustedEnd.y);
      line.setAttribute("stroke", color);
      line.setAttribute("stroke-width", "4");
      line.setAttribute("stroke-linecap", "round");

      svgRef.current.appendChild(line);
    }
  });

  connectionPairs.forEach(({ connections, color, topOrientation, bottomOrientation }) => {
    if (connections.length === 2) {
      const [
        { nodes: [topNode1, bottomNode1] },
        { nodes: [topNode2, bottomNode2] },
      ] = connections;
  
      /**
       * Creates a curved path between two nodes with an arrow.
       * @param {string} startNode - ID of the starting node.
       * @param {string} endNode - ID of the ending node.
       * @param {boolean} isTopCurve - Whether the curve arches upwards or downwards.
       * @param {string} orientation - Arrow direction ('left' | 'right' | 'up' | 'down').
       * @returns {Object|null} SVG path and arrow elements or null if nodes are missing.
       */
      const createCurvedPath = (startNode, endNode, isTopCurve, orientation) => {
        const startElement = document.getElementById(startNode);
        const endElement = document.getElementById(endNode);
  
        if (!startElement || !endElement) return null;
  
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
  
        let startX = startRect.left + startRect.width / 2 - svgRect.left;
        let startY = startRect.top + startRect.height / 2 - svgRect.top;
        let endX = endRect.left + endRect.width / 2 - svgRect.left;
        let endY = endRect.top + endRect.height / 2 - svgRect.top;
  
        const adjustedStart = adjustPoint(startX, startY, endX, endY, offset);
        const adjustedEnd = adjustPoint(endX, endY, startX, startY, offset);
  
        const dx = adjustedEnd.x - adjustedStart.x;
        const dy = adjustedEnd.y - adjustedStart.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        const controlX = (adjustedStart.x + adjustedEnd.x) / 2;
        const controlY = isTopCurve
          ? Math.min(adjustedStart.y, adjustedEnd.y) - distance / 5
          : Math.max(adjustedStart.y, adjustedEnd.y) + distance / 5;
  
        // Create path
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const d = `M ${adjustedStart.x},${adjustedStart.y} Q ${controlX},${controlY} ${adjustedEnd.x},${adjustedEnd.y}`;
        path.setAttribute("d", d);
        path.setAttribute("stroke", color);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-width", "4");
        path.setAttribute("stroke-linecap", "round");
  
        // 获取路径长度和中间点坐标
        const pathLength = path.getTotalLength();
        const midPoint = path.getPointAtLength(pathLength / 2);
        const midX = midPoint.x;
        const midY = midPoint.y;

        // 算出路径切线的角度
        const tangentPoint1 = path.getPointAtLength(pathLength / 2 - 1);
        const tangentPoint2 = path.getPointAtLength(pathLength / 2 + 1);
        const tangentAngle = Math.atan2(tangentPoint2.y - tangentPoint1.y, tangentPoint2.x - tangentPoint1.x) * (180 / Math.PI);

  
        // Create arrow
        const arrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        const arrowSize = 10; // Arrow size
        let arrowPoints;
        if (orientation === "right") {
          arrowPoints = `
            ${midX},${midY - arrowSize} 
            ${midX - arrowSize},${midY} 
            ${midX},${midY + arrowSize}`;
        } else if (orientation === "left") {
          arrowPoints = `
            ${midX},${midY - arrowSize} 
            ${midX + arrowSize},${midY} 
            ${midX},${midY + arrowSize}`;
        } else {
          // Default arrow pointing up
          arrowPoints = `
            ${midX - arrowSize},${midY + arrowSize} 
            ${midX + arrowSize},${midY + arrowSize} 
            ${midX},${midY - arrowSize}`;
        }
        arrow.setAttribute("points", arrowPoints);
        arrow.setAttribute("fill", color);
        arrow.setAttribute(
          "transform",
          `rotate(${tangentAngle}, ${midX}, ${midY})`
        );
  
        return { path, arrow };
      };

      const sortNodes = (nodeA, nodeB) => {
        const numberA = parseInt(nodeA.split('-')[1], 10);
        const numberB = parseInt(nodeB.split('-')[1], 10);
        return numberA < numberB ? [nodeA, nodeB] : [nodeB, nodeA];
      };
    // Sort top nodes
    const [sortedTopNode1, sortedTopNode2] = sortNodes(topNode1, topNode2);

    // Sort bottom nodes
    const [sortedBottomNode1, sortedBottomNode2] = sortNodes(bottomNode1, bottomNode2);

    // Draw top curve with arrow
    const topCurve = createCurvedPath(sortedTopNode1, sortedTopNode2, true, topOrientation);
    if (topCurve) {
      svgRef.current.appendChild(topCurve.path);
      svgRef.current.appendChild(topCurve.arrow);
    }

    // Draw bottom curve with arrow
    const bottomCurve = createCurvedPath(sortedBottomNode1, sortedBottomNode2, false, bottomOrientation);
    if (bottomCurve) {
      svgRef.current.appendChild(bottomCurve.path);
      svgRef.current.appendChild(bottomCurve.arrow);
    }
    }
  });
  
};
