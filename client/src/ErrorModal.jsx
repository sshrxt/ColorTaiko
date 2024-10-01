import React from 'react';

const ErrorModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '80%',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'red', marginTop: 0 }}>Error</h2>
        <p>{message}</p>
        <button onClick={onClose} style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>Close</button>
      </div>
    </div>
  );
};

export default ErrorModal;