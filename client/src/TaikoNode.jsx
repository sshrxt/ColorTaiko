import React, { useState, useEffect } from 'react';


const TaikoNode = ({ id, onClick, isSelected, index, totalCount }) => {
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setEntering(false), 500); 
    return () => clearTimeout(timeout);
  }, []);

  const nodeSize = Math.max(30, 100 / totalCount);
  const label = 'a${index+1}';

  return (
    <div
      id={id}
      onClick={onClick}
      className={`taiko-node ${entering ? 'taiko-node-enter' : ''}`}
      style={{
        backgroundColor: isSelected ? 'yellow' : 'white',
        width: `${nodeSize}px`,
        height: `${nodeSize}px`,
        margin: '5px',
      }}
    >
      {/* <span style={ {position : "absolute", frontSize: '12px'}}>
        {label}
      </span> */}
    </div>
  );
};

export default TaikoNode;
