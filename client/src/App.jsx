import { useState, useRef, useEffect } from 'react';
import InputBox from './InputBox';
import TaikoNode from './TaikoNode';
import ErrorModal from './ErrorModal';

function App() {
  const [topRowCount, setTopRowCount] = useState(5);
  const [bottomRowCount, setBottomRowCount] = useState(6);
  const [showNodes, setShowNodes] = useState(true);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const svgRef = useRef(null);

  useEffect(() => {
    drawConnections();
  }, [connections, topRowCount, bottomRowCount]);
  
  useEffect(() => {
    checkAndAddNewNodes();
  }, [connections, topRowCount, bottomRowCount]);
  
  const checkAndAddNewNodes = () => {
    const allTopNodesConnected = Array.from({ length: topRowCount }, (_, i) =>
      connections.some(conn => conn.nodes.includes(`top-${i}`))
    ).every(Boolean); 
  
    const allBottomNodesConnected = Array.from({ length: bottomRowCount }, (_, i) =>
      connections.some(conn => conn.nodes.includes(`bottom-${i}`))
    ).every(Boolean); 

    if (allTopNodesConnected && allBottomNodesConnected) {
      setTopRowCount(prev => prev + 2);
      setBottomRowCount(prev => prev + 2);
    }
  };
  
  const createTopRow = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <TaikoNode
        key={`top-${i}`}
        id={`top-${i}`}
        onClick={() => handleNodeClick(`top-${i}`)}
        isSelected={selectedNodes.includes(`top-${i}`)}
        index={i}
        totalCount={topRowCount}
      />
    ));
  };
  
  const createBottomRow = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <TaikoNode
        key={`bottom-${i}`}
        id={`bottom-${i}`}
        onClick={() => handleNodeClick(`bottom-${i}`)}
        isSelected={selectedNodes.includes(`bottom-${i}`)}
        index={i}
        totalCount={bottomRowCount}
      />
    ));
  };
  
  

  const handleNodeClick = (nodeId) => {
    setErrorMessage('');
    if (selectedNodes.includes(nodeId)) {
      setSelectedNodes(selectedNodes.filter(id => id !== nodeId));
    } else {
      if (selectedNodes.length < 2) {
        const newSelectedNodes = [...selectedNodes, nodeId];
        setSelectedNodes(newSelectedNodes);
        if (newSelectedNodes.length === 2) {
          tryConnect(newSelectedNodes);
        }
      }
    }
  };

  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 50%)`;
  };

  const tryConnect = (nodes) => {
    const [node1, node2] = nodes;
    const isTopNode = (id) => id.startsWith('top');
    const isBottomNode = (id) => id.startsWith('bottom');

    if (
      (isTopNode(node1) && isTopNode(node2)) ||
      (isBottomNode(node1) && isBottomNode(node2))
    ) {
      setErrorMessage("Can't connect two nodes from the same row.");
      setSelectedNodes([]);
      return;
    }

    if (connections.some(conn => conn.nodes.includes(node1) || conn.nodes.includes(node2))) {
      setErrorMessage("Can't connect to a node that's already connected.");
      setSelectedNodes([]);
      return;
    }

    const newConnection = {
      nodes: nodes,
      color: generateRandomColor()
    };
    setConnections([...connections, newConnection]);
    setSelectedNodes([]);
  };

  const drawConnections = () => {
    if (!svgRef.current) return;

    // Clear existing lines
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild);
    }

    connections.forEach(({nodes: [start, end], color}) => {
      const startElement = document.getElementById(start);
      const endElement = document.getElementById(end);
      if (startElement && endElement) {
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
        const svgRect = svgRef.current.getBoundingClientRect();

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', startRect.left + startRect.width / 2 - svgRect.left);
        line.setAttribute('y1', startRect.top + startRect.height / 2 - svgRect.top);
        line.setAttribute('x2', endRect.left + endRect.width / 2 - svgRect.left);
        line.setAttribute('y2', endRect.top + endRect.height / 2 - svgRect.top);
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', '4');

        svgRef.current.appendChild(line);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowNodes(true);
    setConnections([]);
    setSelectedNodes([]);
    setErrorMessage('');
  };

  const handleClear = () => {
    setConnections([]);
    setSelectedNodes([]);
  };

  return (
    <div style={{ textAlign: 'center', position: 'relative', fontFamily: 'Arial, sans-serif' }} className='AppContainer'>
      <h1 className='title'>ColorTaiko!</h1>
      <h3>Web version</h3>

      <button
        onClick={handleClear}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: 'inherit', // This will use the font from the parent element
        }}
      >
        Clear
      </button>

      <InputBox
        rows={topRowCount}
        setRows={setTopRowCount}
        columns={bottomRowCount}
        setColumns={setBottomRowCount}
        onSubmit={handleSubmit}
      />

      <ErrorModal message={errorMessage} onClose={() => setErrorMessage('')} />

      {showNodes && (
        <div className="GameBox" style={{ position: 'relative' }}>
          <div className='GameRow'>
            {createTopRow(topRowCount)}
          </div>
          <svg 
            ref={svgRef} 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              pointerEvents: 'none' 
            }}
          />
          <div className='GameRow' style={{ marginTop: '100px' }}>
            {createBottomRow(bottomRowCount)}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;