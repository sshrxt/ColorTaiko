import { useState } from 'react';
import InputBox from './InputBox';
import TaikoNode from './TaikoNode';


function App() {
  const [topRowCount, setTopRowCount] = useState(5); // X circles
  const [bottomRowCount, setBottomRowCount] = useState(7); // Y circles
  const [showNodes, setShowNodes] = useState(true);

  const createTopRow = (count) => {
    return Array.from({ length: count }, (_, i) => <TaikoNode key={`top-${i}`} />);
  };

  const createBottomRow = (count) => {
    return Array.from({ length: count }, (_, i) => <TaikoNode key={`bottom-${i}`} />);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowNodes(true);
  };

  return (
    <div style={{ textAlign: 'center' }} className='AppContainer'>
      <h1 className='title'>ColorTaiko!</h1>

      {/* InputBox Component */}
      <InputBox
        rows={topRowCount}
        setRows={setTopRowCount}
        columns={bottomRowCount}
        setColumns={setBottomRowCount}
        onSubmit={handleSubmit}
      />

      {/* Render the taiko nodes */}
      {showNodes && (
        <div className="GameBox">
          <div className='GameRow'>
            {createTopRow(topRowCount)}
          </div>
          <div  className='GameRow'>
            {createBottomRow(bottomRowCount)}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
