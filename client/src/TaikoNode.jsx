import React from 'react';

const TaikoNode = ({ id, onClick, isSelected }) => {
  return (
    <div
      id={id}
      onClick={onClick}
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: isSelected ? 'yellow' : 'white',
        display: 'inline-block',
        margin: '5px',
        cursor: 'pointer',
        border: '2px solid black',
      }}
    />
  );
};

export default TaikoNode;