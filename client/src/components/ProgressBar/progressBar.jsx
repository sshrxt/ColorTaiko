import PropTypes from "prop-types";
import { useState } from 'react';
import './progressBar.css';


const ProgressBar = ({ progress, connections, topRowCount, bottomRowCount, lightMode}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const showTooltip = (e) => {
    setTooltipVisible(true);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  return (
    <div style={{ marginTop: '-55px' }}>
      <p style={{ color: lightMode ? 'black' : 'white', fontSize: '14px', textAlign: 'left', marginBottom: '-5px' }}>
        Can you get to 100%?
      </p>

      <div
        className="progress-bar-container"
        onMouseEnter={showTooltip}
        onMouseMove={showTooltip}
        onMouseLeave={hideTooltip}
      >
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}>
          <span className="progress-bar-text">{Math.round(progress)}%</span>
        </div>
      </div>

      <p style={{ color: lightMode ? 'black' : 'white', fontSize: '14px', textAlign: 'left', marginTop: '-7px', marginBottom: '-20px' }}>
        Progress = <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <span style={{ display: 'block', textAlign: 'center' }}>verticalEdges</span>
          <span style={{ display: 'block', borderTop: lightMode ? '1px solid black' : '1px solid white', paddingTop: '2px', textAlign: 'center' }}>
            (topRowCount - 1) × (bottomRowCount - 1) - (1 if odd, else 0)
          </span>
        </span>
        <span style={{ marginLeft: '5px' }}>× 100%</span>
      </p>

      {tooltipVisible && (
        <div
          className="tooltip"
          style={{ top: tooltipPosition.y + 10, left: tooltipPosition.x + 10 }}
        >
          <p>Vertical Edges: {connections.length}</p>
          <p>Top Nodes: {topRowCount - 1}</p>
          <p>Bottom Nodes: {bottomRowCount - 1}</p>
        </div>
      )}
    </div>
  );
};
ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  connections: PropTypes.array.isRequired,
  topRowCount: PropTypes.number.isRequired,
  bottomRowCount: PropTypes.number.isRequired,
  lightMode: PropTypes.bool.isRequired
};

export default ProgressBar;
