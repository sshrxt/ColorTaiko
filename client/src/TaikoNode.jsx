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
        borderRadius: '50%', // Make the white node circular
        position: 'relative', // Allows positioning inner dot
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid white', // Optional: ensures white border in case of loading artifacts
      }}
    >
      <div
        style={{
          width: `40%`, // Size of inner black dot
          height: `40%`,
          backgroundColor: 'black',
          borderRadius: '50%', // Make inner dot circular
        }}
      ></div>

      {/* <span style={ {position : "absolute", fontSize: '12px'}}>
        {label}
      </span> */}
    </div>
  );
};

export default TaikoNode;