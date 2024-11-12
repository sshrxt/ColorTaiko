import './stageIndicator.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StageIndicator = ({ currentStage, onStageClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const stages = [1, 2, 3, 4];
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [tooltipContent, setTooltipContent] = useState('');

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const showTooltip = (e, content) => {
        
        setTooltipVisible(true);
        setTooltipPosition({ x: e.clientX, y: e.clientY });
        setTooltipContent(content);
    };

    const hideTooltip = () => {
        setTooltipVisible(false);
    };

    return (
      <div
        className={`stage-indicator ${isExpanded ? 'expanded' : 'collapsed'}`}
        onClick={toggleExpand}
      >
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`stage-container ${(!isExpanded && stage !== currentStage) ? 'hidden' : ''}`}
            style={{
              transitionDelay: `${index * 50}ms`, 
              display: isExpanded || stage === currentStage ? 'flex' : 'none'
            }}
          >
            {index > 0 && isExpanded && (
              <div className={`line ${currentStage >= stage ? 'active' : ''}`} />
            )}
            <div
              className={`circle circle-${stage} ${currentStage >= stage ? 'active' : ''}`}
              onClick={() => onStageClick(stage)}
              onMouseEnter={(e) => showTooltip(e, `Stage ${stage} details`)} // Set tooltip content dynamically
              onMouseMove={(e) => showTooltip(e, `Stage ${stage} details`)}
              onMouseLeave={hideTooltip}
            >
              {stage}
            </div>
          </div>
        ))}

        {tooltipVisible && (
          <div
            className="tooltip"
            style={{ top: tooltipPosition.y + 10, left: tooltipPosition.x + 10 }}
          >
            <p>TEstTEst</p>
          </div>
        )}
      </div>
    );
};

StageIndicator.propTypes = {
    currentStage: PropTypes.number.isRequired,
    onStageClick: PropTypes.func.isRequired,
};

export default StageIndicator;
