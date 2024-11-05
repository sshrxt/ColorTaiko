import React, { useState, useEffect } from 'react';


const TaikoNode = ({ id, onClick, isSelected, index, totalCount, isFaded, position }) => {
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setEntering(false), 500); 
    return () => clearTimeout(timeout);
  }, []);

  const nodeSize = Math.max(30, 100 / totalCount);
  const label = position === "top" ? `b${index + 1}` : `a${index + 1}`;

  return (
    <div
      id={id}
      onClick={onClick}
      className={`taiko-node ${entering ? 'taiko-node-enter' : ''}`}
      style={{
        backgroundColor: isSelected ? 'yellow' : isFaded ? '#939799' : 'white',
        opacity: isSelected ? 1 : isFaded ? 0.5 : 1,
        width: `${nodeSize}px`,
        height: `${nodeSize}px`,
        margin: '5px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 0,
      }}
    >
      {position === "top" && (
        <span style={{ position: "absolute", top: "-30px", fontSize: '20px', color: 'white', fontFamily: "'STIX Two Math', serif"   }}>
          {label}
        </span>
      )}
      <div style={{ width: '100%', height: '100%' }} />
      {position === "bottom" && (
        <span style={{ position: "absolute", bottom: "-30px", fontSize: '20px', color: 'white', fontFamily: "'STIX Two Math', serif"   }}>
          {label}
        </span>
      )}
    </div>
  );
};

export default TaikoNode;