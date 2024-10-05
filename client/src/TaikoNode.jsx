import React, { useState, useEffect } from 'react';

const TaikoNode = ({ id, onClick, isSelected, index, totalCount }) => {
  const [entering, setEntering] = useState(true); // 控制节点的进入动画

  useEffect(() => {
    const timeout = setTimeout(() => setEntering(false), 500); // 动画结束后进入正常状态
    return () => clearTimeout(timeout);
  }, []);

  const nodeSize = Math.max(30, 100 / totalCount); // 根据总节点数量动态调整大小，至少为30px

  return (
    <div
      id={id}
      onClick={onClick}
      className={`taiko-node ${entering ? 'taiko-node-enter' : ''}`}
      style={{
        backgroundColor: isSelected ? 'yellow' : 'white',
        width: `${nodeSize}px`, // 动态调整宽度
        height: `${nodeSize}px`,
        margin: '5px',
      }}
    />
  );
};

export default TaikoNode;
