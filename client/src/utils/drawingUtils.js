
export const drawConnections = (svgRef, connections, connectionPairs) => {
    if (!svgRef.current) return;
  
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild);
    }
  
    const svgRect = svgRef.current.getBoundingClientRect();
  
    connections.forEach(({ nodes: [start, end], color }) => {
      const startElement = document.getElementById(start);
      const endElement = document.getElementById(end);
  
      if (startElement && endElement) {
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
  
        const startX = startRect.left + startRect.width / 2 - svgRect.left;
        const startY = startRect.top + startRect.height / 2 - svgRect.top;
        const endX = endRect.left + endRect.width / 2 - svgRect.left;
        const endY = endRect.top + endRect.height / 2 - svgRect.top;
  
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", startX);
        line.setAttribute("y1", startY);
        line.setAttribute("x2", endX);
        line.setAttribute("y2", endY);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "4");
        line.setAttribute("stroke-linecap", "round");
  
        svgRef.current.appendChild(line);
      }
    });
  
    connectionPairs.forEach((pair) => {
      if (pair.length === 2) {
        const [
          {
            nodes: [startNode1, bottomNode1],
          },
          {
            nodes: [startNode2, bottomNode2],
            color,
          },
        ] = pair;
  
        const topFirst1 = !startNode1.startsWith("bottom");
        const topFirst2 = !startNode2.startsWith("bottom");
  
        const createCurvedPath = (startNode, endNode, isTopCurve) => {
          const startElement = document.getElementById(startNode);
          const endElement = document.getElementById(endNode);
          if (!startElement || !endElement) return null;
  
          const startRect = startElement.getBoundingClientRect();
          const endRect = endElement.getBoundingClientRect();
  
          const startX = startRect.left + startRect.width / 2 - svgRect.left;
          const startY = startRect.top + startRect.height / 2 - svgRect.top;
          const endX = endRect.left + endRect.width / 2 - svgRect.left;
          const endY = endRect.top + endRect.height / 2 - svgRect.top;
  
          const dx = endX - startX;
          const dy = endY - startY;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          const controlX = (startX + endX) / 2;
          const controlY = isTopCurve
            ? Math.min(startY, endY) - distance / 5
            : Math.max(startY, endY) + distance / 5;
  
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          const d = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
          path.setAttribute("d", d);
          path.setAttribute("stroke", color);
          path.setAttribute("fill", "none");
          path.setAttribute("stroke-width", "4");
          path.setAttribute("stroke-linecap", "round");
  
          return path;
        };
  
        const topCurve = createCurvedPath(
          topFirst1 ? startNode1 : bottomNode1,
          topFirst2 ? startNode2 : bottomNode2,
          true 
        );
        if (topCurve) svgRef.current.appendChild(topCurve);
  
        const bottomCurve = createCurvedPath(
          topFirst1 ? bottomNode1 : startNode1,
          topFirst2 ? bottomNode2 : startNode2,
          false 
        );
        if (bottomCurve) svgRef.current.appendChild(bottomCurve);
      }
    });
  };
  