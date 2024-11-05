
export const drawConnections = (svgRef, connections, connectionPairs, offset) => {
    if (!svgRef.current) return;
  
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild);
    }
  
    const svgRect = svgRef.current.getBoundingClientRect();
    
    const adjustPoint = (x1, y1, x2, y2, distance) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy);
      const scale = (len - distance) / len;
      return {
          x: x1 + dx * scale,
          y: y1 + dy * scale
      };
    };

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

        // Adjust points to be offset from node centers
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
  
          let startX = startRect.left + startRect.width / 2 - svgRect.left;
          let startY = startRect.top + startRect.height / 2 - svgRect.top;
          let endX = endRect.left + endRect.width / 2 - svgRect.left;
          let endY = endRect.top + endRect.height / 2 - svgRect.top;

          // Adjust points to be offset from node centers
          const adjustedStart = adjustPoint(startX, startY, endX, endY, offset);
          const adjustedEnd = adjustPoint(endX, endY, startX, startY, offset);
  
          const dx = adjustedEnd.x - adjustedStart.x;
          const dy = adjustedEnd.y - adjustedStart.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          const controlX = (adjustedStart.x + adjustedEnd.x) / 2;
          const controlY = isTopCurve
            ? Math.min(adjustedStart.y, adjustedEnd.y) - distance / 5
            : Math.max(adjustedStart.y, adjustedEnd.y) + distance / 5;
  
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          const d = `M ${adjustedStart.x},${adjustedStart.y} Q ${controlX},${controlY} ${adjustedEnd.x},${adjustedEnd.y}`;
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
  