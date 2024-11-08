import React from 'react';

function OptionButton({ text, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '424px',
        height: '46px',
        color: '#1B78FF',
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '6px',
        border: isSelected ? '1px solid #1B78FF' : '1px solid #B5D3FF',
        backgroundColor: isSelected ? '#E8F1FF' : '#ffffff',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '700',
      }}
    >
      {text}
    </button>
  );
}

export default OptionButton;
