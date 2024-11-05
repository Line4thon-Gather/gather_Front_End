import React from 'react';

function NextButton({ isEnabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={!isEnabled}
      style={{
        margin: '10px',
        width: '420px',
        height: '46px',
        padding: '10px 42px',
        marginTop: '20px',
        fontSize: '16px',
        backgroundColor: isEnabled ? '#1B78FF' : '#D1D4D8',
        color: isEnabled ? '#FFFFFF' : '#ADB3BA',
        cursor: isEnabled ? 'pointer' : 'not-allowed',
        border: 'none',
        gap: '10px',
        borderRadius: '6px',
        fontWeight: '700',
      }}
    >
      선택 완료
    </button>
  );
}

export default NextButton;
