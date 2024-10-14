import React from 'react';

const Connections = ({ startRect, endRect, svgRect, color, svgRef }) => {
  React.useEffect(() => {
    if (!svgRef.current) return;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startRect.left + startRect.width / 2 - svgRect.left);
    line.setAttribute('y1', startRect.top + startRect.height / 2 - svgRect.top);
    line.setAttribute('x2', endRect.left + endRect.width / 2 - svgRect.left);
    line.setAttribute('y2', endRect.top + endRect.height / 2 - svgRect.top);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '4');

    svgRef.current.appendChild(line);

    return () => {
      if (svgRef.current) {
        svgRef.current.removeChild(line);
      }
    };
  }, [startRect, endRect, svgRect, color, svgRef]);

  return null;
};

export default Connections;